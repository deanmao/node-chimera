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
      'conditions': [
        ['OS=="mac"', {
          'include_dirs': [
            'qt/include',
            'qt/include/QtCore',
            'qt/include/QtGui',
            'qt/include/QtNetwork',
            'qt/include/QtWebkit'
          ],
          'libraries': [
            '-framework AppKit',
            '../qt/lib/libQtGui.so',
            '../qt/lib/libQtCore.so',
            '../qt/lib/libQtNetwork.so',
            '../qt/lib/libQtWebKit.so',
            '../qt/lib/libjscore.so',
            '../qt/lib/libwebcore.so',
            '../qt/lib/libQtXml.so'
          ],
        }],
        ['OS=="linux"', {
          'include_dirs': [
            'qt/include',
            'qt/include/QtCore',
            'qt/include/QtGui',
            'qt/include/QtNetwork',
            'qt/include/QtWebKit',
            'qt/include/QtWidgets',
            'qt/include/QtWebKitWidgets'
          ],
          'ldflags': [
             '-Wl,-rpath <!@(pwd)/qt/lib'
           ],
          'libraries': [
            '../qt/lib/libQt5Gui.so',
            '../qt/lib/libQt5Core.so',
            '../qt/lib/libQt5Widgets.so',
            '../qt/lib/libQt5Network.so',
            '../qt/lib/libQt5Xml.so',
            '../qt/lib/libQt5Designer.so',
            '../qt/lib/libQt5WebKit.so',
            '../qt/lib/libQt5WebKitWidgets.so'
          ],
        }]
      ]
    }
  ]
}
