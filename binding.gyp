{
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
            'qt_compiled/include',
            'qt_compiled/include/QtCore',
            'qt_compiled/include/QtGui',
            'qt_compiled/include/QtNetwork',
            'qt_compiled/include/QtWebkit'
          ],
          'libraries': [
            '-framework AppKit',
            '../qt_compiled/lib/libQtGui.a',
            '../qt_compiled/lib/libQtCore.a',
            '../qt_compiled/lib/libQtNetwork.a',
            '../qt_compiled/lib/libQtWebKit.a',
            '../qt_compiled/lib/libjscore.a',
            '../qt_compiled/lib/libwebcore.a',
            '../qt_compiled/lib/libQtXml.a'
          ],
        }],
        ['OS=="linux"', {
          'include_dirs': [
            'qt_compiled/include',
            'qt_compiled/include/QtCore',
            'qt_compiled/include/QtGui',
            'qt_compiled/include/QtNetwork',
            'qt_compiled/include/QtWebKit'
          ],
          'libraries': [
            '../deps/openssl/linux/lib/libssl.a',
            '../deps/openssl/linux/lib/libcrypto.a',
            '../qt_compiled/lib/libQtCore.a',
            '../qt_compiled/lib/libQtGui.a',
            '../qt_compiled/lib/libQtXml.a',
            '../qt_compiled/lib/libQtNetwork.a',
            '../qt_compiled/lib/libQtWebKit.a',
            '../qt_compiled/lib/libwebcore.a',
            '../qt_compiled/lib/libjscore.a'
          ],
        }]
      ]
    }
  ]
}
