import { XcodeProject } from '@expo/config-plugins'
import util from 'util'

export function addBuildPhases(
    xcodeProject: XcodeProject,
    {
        targetUuid,
        groupName,
        productFile,
        compileSources,
        copyBundleResources,
    }: {
        targetUuid: string
        groupName: string
        productFile: {
            uuid: string
            target: string
            basename: string
            group: string
        }
        compileSources: string[]
        copyBundleResources: string[]
    },
) {
    const buildPath = `"$(CONTENTS_FOLDER_PATH)/Watch"`
    const folderType = 'watch2_app'

    // Sources build phase
    xcodeProject.addBuildPhase(
        compileSources,
        'PBXSourcesBuildPhase',
        groupName,
        targetUuid,
        folderType,
        buildPath,
    )

    // Copy files build phase
    xcodeProject.addBuildPhase(
        [],
        'PBXCopyFilesBuildPhase',
        groupName,
        xcodeProject.getFirstTarget().uuid,
        folderType,
        buildPath,
    )

    xcodeProject
        .buildPhaseObject(
            'PBXCopyFilesBuildPhase',
            groupName,
            productFile.target,
        )
        .files.push({
            value: productFile.uuid,
            comment: util.format(
                '%s in %s',
                productFile.basename,
                productFile.group,
            ), // longComment(file);
        })
    xcodeProject.addToPbxBuildFileSection(productFile)

    // Frameworks build phase
    xcodeProject.addBuildPhase(
        [],
        'PBXFrameworksBuildPhase',
        groupName,
        targetUuid,
        folderType,
        buildPath,
    )

    // Resources build phase
    xcodeProject.addBuildPhase(
        copyBundleResources,
        'PBXResourcesBuildPhase',
        groupName,
        targetUuid,
        folderType,
        buildPath,
    )
}
