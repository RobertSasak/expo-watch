import { ConfigPlugin, withXcodeProject } from '@expo/config-plugins'

import { addBuildPhases } from './addBuildPhases'
import { addPbxGroup } from './addPbxGroup'
import { addProductFile } from './addProductFile'
import { addSwiftPackages, SwiftPackage } from './addSwiftPackages'
import { addTargetDependency } from './addTargetDependency'
import { addToPbxNativeTargetSection } from './addToPbxNativeTargetSection'
import { addToPbxProjectSection } from './addToPbxProjectSection'
import { addXCConfigurationList, BuildSettings } from './addXCConfigurationList'

const withWatchApp: ConfigPlugin<{
    targetName?: string
    groupName?: string
    setVersionFromCompanionApp?: boolean
    buildSettings?: BuildSettings
    debugBuildSettings?: BuildSettings
    releaseBuildSettings?: BuildSettings
    files?: string[]
    compileSources?: string[]
    copyBundleResources?: string[]
    swiftPackages?: SwiftPackage[]
}> = (
    config,
    {
        targetName = 'Sample Watch App',
        groupName = 'Embed Watch Content',
        setVersionFromCompanionApp = true,
        buildSettings = {},
        debugBuildSettings = {},
        releaseBuildSettings = {},
        files = [],
        compileSources = [],
        copyBundleResources = [],
        swiftPackages = [],
    } = {},
) => {
    return withXcodeProject(config, (config) => {
        const version = config.version ?? '1.0.0'
        const xcodeProject = config.modResults

        const targetUuid = xcodeProject.generateUuid()

        const xCConfigurationList = addXCConfigurationList(xcodeProject, {
            targetName,
            buildSettings: {
                ...buildSettings,
                ...(setVersionFromCompanionApp
                    ? { MARKETING_VERSION: version }
                    : undefined),
            },
            debugBuildSettings,
            releaseBuildSettings,
        })

        const productFile = addProductFile(xcodeProject, {
            targetName,
            groupName,
        })

        const target = addToPbxNativeTargetSection(xcodeProject, {
            targetName,
            targetUuid,
            productFile,
            xCConfigurationList,
        })

        addTargetDependency(xcodeProject, target)
        addToPbxProjectSection(xcodeProject, target)

        addPbxGroup(xcodeProject, {
            targetName,
            files,
        })

        const { frameworksBuildPhaseUuid } = addBuildPhases(xcodeProject, {
            targetUuid,
            groupName,
            productFile,
            compileSources,
            copyBundleResources,
        })

        addSwiftPackages(xcodeProject, {
            targetUuid,
            frameworksBuildPhaseUuid,
            swiftPackages,
        })

        return config
    })
}

export default withWatchApp
