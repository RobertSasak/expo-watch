import { ConfigPlugin, withXcodeProject } from '@expo/config-plugins'

import { addBuildPhases } from './addBuildPhases'
import { addPbxGroup } from './addPbxGroup'
import { addProductFile } from './addProductFile'
import { addTargetDependency } from './addTargetDependency'
import { addToPbxNativeTargetSection } from './addToPbxNativeTargetSection'
import { addToPbxProjectSection } from './addToPbxProjectSection'
import { addXCConfigurationList } from './addXCConfigurationList'

const withWatchApp: ConfigPlugin<{
    targetName?: string
    groupName?: string
    setVersionFromCompanionApp?: boolean
    buildSettings?: Record<string, string | number>
    files?: string[]
    compileSources?: string[]
    copyBundleResources?: string[]
}> = (
    config,
    {
        targetName = 'Sample Watch App',
        groupName = 'Embed Watch Content',
        setVersionFromCompanionApp = true,
        buildSettings = {},
        files = [],
        compileSources = [],
        copyBundleResources = [],
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

        addBuildPhases(xcodeProject, {
            targetUuid,
            groupName,
            productFile,
            compileSources,
            copyBundleResources,
        })

        return config
    })
}

export default withWatchApp
