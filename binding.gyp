{
  'downloader': '<!(node scripts/downloader.js)',
  'targets': [
    {
      'target_name': 'chimera',
      'sources': [
        'src/top.cc',
        'src/cookiejar.cc',
        'src/chimera.cc',
        'src/browser.cc'
      ],
      'include_dirs': [
        'qt/include',
        'qt/include/QtCore',
        'qt/include/QtGui',
        'qt/include/QtNetwork',
        'qt/include/QtWebKit',
        'qt/include/QtWidgets',
        'qt/include/QtWebKitWidgets'
      ],
      'conditions': [
        ['OS=="mac"', {
          'libraries': [
            '-framework AppKit',
            '../qt/lib/libQt5Gui.dylib',
            '../qt/lib/libQt5Core.dylib',
            '../qt/lib/libQt5Widgets.dylib',
            '../qt/lib/libQt5Network.dylib',
            '../qt/lib/libQt5WebKit.dylib',
            '../qt/lib/libQtWebKitWidgets.dylib'
          ],
          'xcode_settings': {
            'OTHER_LDFLAGS': [
              '-Wl,-rpath <(module_root_dir)/qt/lib'
            ]
          }
        }],
        ['OS=="linux"', {
          'ldflags': [
             '-Wl,-rpath <(module_root_dir)/qt/lib'
           ],
          'libraries': [
            '../qt/lib/libQt5Gui.so',
            '../qt/lib/libQt5Core.so',
            '../qt/lib/libQt5Widgets.so',
            '../qt/lib/libQt5Network.so',
            '../qt/lib/libQt5WebKit.so',
            '../qt/lib/libQt5WebKitWidgets.so',
            '../qt/plugins/platforms/libqminimal.so'
          ],
        }]
      ]
    }
  ]
}
