# Expo Watch app

Extend your Expo managed workflow with a Apple Watch app.

## Motivation

At some point, you may want to extend your Expo managed app for an Apple Watch app. Typically you would need to eject Expo to do this. This plugin will help you to add a Watch app to your managed Expo project without ejecting.

## How it works

By leveraging Expo plugin system it essantially adds necesssary build and configuration files to your xcode workspace. This way you do not have to reject Expo app and maintain ios folder. Plugin add a new watch target to your xcode workspace and link native swift code to your Expo app. Native swift code is linked from outside of ios folder.

## Before you start

This plugin is based on the great work of [Daniel Friyia](https://github.com/friyiajr) and his youtube channel [DanRNLab](https://www.youtube.com/@DanRNLab). In his video [How to build a React Native Expo App with Apple Watch ( Tutorial )](https://www.youtube.com/watch?v=Z6xRCyhrg1A) he provides step by step tutorial how to add Watch app. I strongly recommend to watch his video before you start. Code in this repo is copied from his tutorial and [example repo](https://github.com/friyiajr/RealtimeWatchApp).

## Installation

```bash
yarn add expo-watch
```

```bash
# temporary eject Expo app
npx expo prebuild --platform ios --clean
# open xcode workspace
xed ios
```

In you xcode project add new Watch target "<name> Watch app". Develop your Watch app. Once happy add temporary ios folder into git. This will allow you to easily see that expo-watch plugin is generating correct xcode project files for you.

Copy your watch app "<name> Watch app" outside of ios folder into root of your project. This is important as plugin will link these files to xcode workspace.

## Configuration

Register plugin in `app.json` file.

```json
{
    "expo": {
        // ...
        "plugins": [
            "expo-watch",
            {
                //...long config file
            }
        ]
    }
}
```

Plugin is a simple as possible do not provide many default configuration options. You have to provide all necessary configuration options. This may look very intimidating but it is not that hard and it give you full control over your Watch app.

Be aware of how string are escaped in JSON and that string values need to use extra quotes.

### Full configuration options

You can copy this configuration and adjust it to your needs. Remmeber to replace all TODOs.

```json
{
    "targetName": "Example Watch App",
    "buildSettings": {
        "ASSETCATALOG_COMPILER_APPICON_NAME": "AppIcon",
        "ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS": "YES",
        "ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME": "AccentColor",
        "CLANG_ANALYZER_NONNULL": "YES",
        "CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION": "YES_AGGRESSIVE",
        "CLANG_CXX_LANGUAGE_STANDARD": "\"gnu++20\"",
        "CLANG_ENABLE_OBJC_WEAK": "YES",
        "CLANG_WARN_DOCUMENTATION_COMMENTS": "YES",
        "CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER": "YES",
        "CLANG_WARN_UNGUARDED_AVAILABILITY": "YES_AGGRESSIVE",
        "CODE_SIGN_IDENTITY": "\"Apple Development\"",
        "CODE_SIGN_STYLE": "Automatic",
        "CURRENT_PROJECT_VERSION": "1",
        "DEBUG_INFORMATION_FORMAT": "dwarf",
        "DEVELOPMENT_ASSET_PATHS": "\"\\\"../Example\\ Watch\\ App/Preview\\ Content\\\"\"", // TODO
        "DEVELOPMENT_TEAM": "\"XXXXXXXXXX\"", // TODO
        "ENABLE_PREVIEWS": "YES",
        "ENABLE_USER_SCRIPT_SANDBOXING": "YES",
        "GCC_C_LANGUAGE_STANDARD": "gnu17",
        "GENERATE_INFOPLIST_FILE": "YES",
        "INFOPLIST_KEY_CFBundleDisplayName": "\"Example App\"", // TODO
        "INFOPLIST_KEY_UISupportedInterfaceOrientations": "\"UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown\"",
        "INFOPLIST_KEY_WKCompanionAppBundleIdentifier": "com.example.parentapp", // TODO
        "INFOPLIST_KEY_WKRunsIndependentlyOfCompanionApp": "YES",
        "LD_RUNPATH_SEARCH_PATHS": "(\"$(inherited)\",\"@executable_path/Frameworks\")",
        "LOCALIZATION_PREFERS_STRING_CATALOGS": "YES",
        "MTL_ENABLE_DEBUG_INFO": "INCLUDE_SOURCE",
        "MTL_FAST_MATH": "YES",
        "OTHER_SWIFT_FLAGS": "\"$(inherited) -D EXPO_CONFIGURATION_DEBUG\"",
        "PRODUCT_BUNDLE_IDENTIFIER": "com.example.parentapp.watchkitapp", // TODO
        "PRODUCT_NAME": "\"$(TARGET_NAME)\"",
        "SDKROOT": "watchos",
        "SKIP_INSTALL": "YES",
        "SWIFT_ACTIVE_COMPILATION_CONDITIONS": "\"DEBUG $(inherited)\"",
        "SWIFT_EMIT_LOC_STRINGS": "YES",
        "SWIFT_OPTIMIZATION_LEVEL": "-Onone",
        "SWIFT_VERSION": 5.0,
        "TARGETED_DEVICE_FAMILY": 4,
        "WATCHOS_DEPLOYMENT_TARGET": 8.0
    },
    "files": ["Assets.xcassets", "ContentView.swift", "WatchApp.swift"],
    "compileSources": ["ContentView.swift", "WatchApp.swift"],
    "copyBundleResources": ["Assets.xcassets", "Preview Assets.xcassets"]
}
```

### Options

#### targetName?: string (default: "Sample Watch App")

How will the target in xcode will be called.

#### groupName?: string (default: "Embed Watch Content")

#### setVersionFromCompanionApp?: boolean (default: true)

If true it will add propert _MARKETING_VERSION_ with version found in from app.json. Watch and iOS app will have the same version. Otherwise you need to provide it manually in build settings.

#### buildSettings?: Record<string, string | number> (default: {})

This list is intentionally empty by default. Plugin do not provide any hidden build settings. Feel free to copy it from above.

#### files?: string[] (default: [])

List of files that will be linked to xcode workspace. Here you include all swift and xcassets files.

#### compileSources?: string[] (default: [])

List of fileds that will be compiled. Here you include all swift files.

#### copyBundleResources?: string[] (default: [])

List of xcassets files. Typically these two files.

```json
"copyBundleResources": [
  "Assets.xcassets",
  "Preview Assets.xcassets"
]
```

## Contributing

As this a niche plugin it is not possible to provide a lot of support. If you have any issues please open an issue on this repo. I will try to help you as much as I can. There are only handful of code files in this plugin so you can easily debug it yourself.

Make a clone of this repo and local reference in your project. You can also example folders in this repo to see how it works.

```json
    "plugins": [
      "../../../expo-watch/plugin/src/app.plugin.js",
      {
        //...long config file
      }
```

## TODO

-   [ ] Add watch files into subfolders. Currently all files are in root folder.
-   [ ] Automatically add all swift files from watch folder to xcode workspace. Currently all swift files need to be listed in config manually.
-   [ ] Automatically add all swift files to build.
-   [ ] Communication between Watch and iOS app.

## License

MIT
