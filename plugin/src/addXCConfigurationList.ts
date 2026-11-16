import { XcodeProject } from '@expo/config-plugins'

export type BuildSettings = Record<string, string | number>

export function addXCConfigurationList(
    xcodeProject: XcodeProject,
    {
        targetName,
        buildSettings,
        debugBuildSettings,
        releaseBuildSettings,
    }: {
        targetName: string
        buildSettings: BuildSettings
        debugBuildSettings: BuildSettings
        releaseBuildSettings: BuildSettings
    },
) {
    const buildConfigurationsList = [
        {
            isa: 'XCBuildConfiguration',
            buildSettings: { ...buildSettings, ...debugBuildSettings },
            name: 'Debug',
        },
        {
            isa: 'XCBuildConfiguration',
            buildSettings: { ...buildSettings, ...releaseBuildSettings },
            name: 'Release',
        },
    ]

    const xCConfigurationList = xcodeProject.addXCConfigurationList(
        buildConfigurationsList,
        'Release',
        `Build configuration list for PBXNativeTarget "${targetName}"`,
    )

    return xCConfigurationList
}
