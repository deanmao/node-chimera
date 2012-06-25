{
  'targets': [
    {
      'target_name': 'chimera',
      'type': '<(library)',
      'sources': [
        'src/top.cc', 
        'src/cookiejar.cc', 
        'src/chimera.cc', 
        'src/browser.cc'
      ],
      'conditions': [
        ['OS=="mac"', {
          'include_dirs': [
            'deps/qt-4.8.0/darwin/x64/include',
            'deps/qt-4.8.0/darwin/x64/include/QtCore',
            'deps/qt-4.8.0/darwin/x64/include/QtGui',
            'deps/qt-4.8.0/darwin/x64/include/QtNetwork',
            'deps/qt-4.8.0/darwin/x64/include/QtWebkit'
          ],
          'libraries': [
            '-framework AppKit',
            '../deps/qt-4.8.0/darwin/x64/lib/libQtGui.a',
            '../deps/qt-4.8.0/darwin/x64/lib/libQtCore.a',
            '../deps/qt-4.8.0/darwin/x64/lib/libQtNetwork.a',
            '../deps/qt-4.8.0/darwin/x64/lib/libQtWebKit.a',
            '../deps/qt-4.8.0/darwin/x64/lib/libjscore.a',
            '../deps/qt-4.8.0/darwin/x64/lib/libwebcore.a',
            '../deps/qt-4.8.0/darwin/x64/lib/libQtXml.a'
          ],
        }],
        ['OS=="linux"', {
          'include_dirs': [
            'deps/qt-4.8.0/linux/include',
            'deps/qt-4.8.0/linux/include/QtCore',
            'deps/qt-4.8.0/linux/include/QtGui',
            'deps/qt-4.8.0/linux/include/QtNetwork',
            'deps/qt-4.8.0/linux/include/QtWebkit'
          ],
          'libraries': [
            '-framework AppKit',
            '../deps/qt-4.8.0/linux/lib/libQtGui.a',
            '../deps/qt-4.8.0/linux/lib/libQtCore.a',
            '../deps/qt-4.8.0/linux/lib/libQtNetwork.a',
            '../deps/qt-4.8.0/linux/lib/libQtWebKit.a',
            '../deps/qt-4.8.0/linux/lib/libjscore.a',
            '../deps/qt-4.8.0/linux/lib/libwebcore.a',
            '../deps/qt-4.8.0/linux/lib/libQtXml.a'
          ],
        }]
      ]
    }
  ]
}
