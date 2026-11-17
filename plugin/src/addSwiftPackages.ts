import { XcodeProject } from '@expo/config-plugins'

export type SwiftPackage = {
    /** Git URL of the package, e.g. https://github.com/kean/Nuke */
    url: string
    /** Minimum version. Xcode resolves up to the next major version. */
    version: string
    /** Products of the package to link into the watch app, e.g. ["NukeUI"] */
    products: string[]
}

function packageName(url: string) {
    return (
        url
            .replace(/\/+$/, '')
            .split('/')
            .pop()
            ?.replace(/\.git$/, '') ?? url
    )
}

function findPackageReference(
    references: Record<string, any>,
    url: string,
): string | undefined {
    return Object.keys(references).find(
        (key) =>
            !key.endsWith('_comment') &&
            references[key].repositoryURL?.replace(/^"|"$/g, '') === url,
    )
}

export function addSwiftPackages(
    xcodeProject: XcodeProject,
    {
        targetUuid,
        frameworksBuildPhaseUuid,
        swiftPackages,
    }: {
        targetUuid: string
        frameworksBuildPhaseUuid: string
        swiftPackages: SwiftPackage[]
    },
) {
    if (swiftPackages.length === 0) {
        return
    }

    const objects = xcodeProject.hash.project.objects
    objects.XCRemoteSwiftPackageReference ??= {}
    objects.XCSwiftPackageProductDependency ??= {}

    const project = xcodeProject.getFirstProject().firstProject
    project.packageReferences ??= []

    const target = xcodeProject.pbxNativeTargetSection()[targetUuid]
    target.packageProductDependencies ??= []

    const frameworksBuildPhase =
        objects.PBXFrameworksBuildPhase[frameworksBuildPhaseUuid]
    frameworksBuildPhase.files ??= []

    for (const { url, version, products } of swiftPackages) {
        const referenceComment = `XCRemoteSwiftPackageReference "${packageName(url)}"`

        // Reuse the reference if the iOS app already depends on the same package.
        let referenceUuid = findPackageReference(
            objects.XCRemoteSwiftPackageReference,
            url,
        )
        if (!referenceUuid) {
            referenceUuid = xcodeProject.generateUuid() as string
            objects.XCRemoteSwiftPackageReference[referenceUuid] = {
                isa: 'XCRemoteSwiftPackageReference',
                repositoryURL: `"${url}"`,
                requirement: {
                    kind: 'upToNextMajorVersion',
                    minimumVersion: version,
                },
            }
            objects.XCRemoteSwiftPackageReference[
                `${referenceUuid}_comment`
            ] = referenceComment
            project.packageReferences.push({
                value: referenceUuid,
                comment: referenceComment,
            })
        }

        for (const product of products) {
            const productUuid = xcodeProject.generateUuid() as string
            objects.XCSwiftPackageProductDependency[productUuid] = {
                isa: 'XCSwiftPackageProductDependency',
                package: referenceUuid,
                package_comment: referenceComment,
                productName: product,
            }
            objects.XCSwiftPackageProductDependency[`${productUuid}_comment`] =
                product
            target.packageProductDependencies.push({
                value: productUuid,
                comment: product,
            })

            const buildFileUuid = xcodeProject.generateUuid() as string
            const buildFileComment = `${product} in Frameworks`
            objects.PBXBuildFile[buildFileUuid] = {
                isa: 'PBXBuildFile',
                productRef: productUuid,
                productRef_comment: product,
            }
            objects.PBXBuildFile[`${buildFileUuid}_comment`] = buildFileComment
            frameworksBuildPhase.files.push({
                value: buildFileUuid,
                comment: buildFileComment,
            })
        }
    }
}
