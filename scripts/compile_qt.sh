#!/bin/bash

wget http://download.qt-project.org/official_releases/qt/5.0/5.0.2/single/qt-everywhere-opensource-src-5.0.2.tar.gz
tar zxvf qt-everywhere-opensource-src-5.0.2.tar.gz
cd qt5

COMPILE_JOBS=4

QT_CFG=''
QT_CFG+=' -opensource'          # Use the open-source license
QT_CFG+=' -confirm-license'     # Silently acknowledge the license confirmation
QT_CFG+=' -v'                   # Makes it easier to see what header dependencies are missing

if [[ $OSTYPE = darwin* ]]; then
    QT_CFG+=' -no-dwarf2'
    QT_CFG+=' -openssl'
    QT_CFG+=' -qpa cocoa'
    QT_CFG+=' -no-c++11'
else
    QT_CFG+=' -fontconfig'      # Fontconfig for better font matching
    QT_CFG+=' -openssl-linked'
fi

QT_CFG+=' -nomake examples'     # Don't build any examples
QT_CFG+=' -nomake tests'        # Don't built the tools

# Irrelevant Qt features
QT_CFG+=' -no-cups'
QT_CFG+=' -no-opengl'
QT_CFG+=' -no-kms'
QT_CFG+=' -no-rpath'
QT_CFG+=' -no-dbus'
QT_CFG+=' -reduce-relocations'
QT_CFG+=' -no-xcb'
QT_CFG+=' -no-eglfs'
QT_CFG+=' -no-directfb'
QT_CFG+=' -no-linuxfb'
QT_CFG+=' -no-kms'
QT_CFG+=' -qpa minimal'

until [ -z "$1" ]; do
    case $1 in
        "--qt-config")
            shift
            QT_CFG+=" $1"
            shift;;
        "--jobs")
            shift
            COMPILE_JOBS=$1
            shift;;
        "--help")
            echo "Usage: $0 [--qt-config CONFIG] [--jobs NUM]"
            echo
            echo "  --qt-config CONFIG          Specify extra config options to be used when configuring Qt"
            echo "  --jobs NUM                  How many parallel compile jobs to use. Defaults to 4."
            echo
            exit 0
            ;;
        *)
            echo "Unrecognised option: $1"
            exit 1;;
    esac
done


# For parallelizing the bootstrapping process, e.g. qmake and friends.
export MAKEFLAGS=-j$COMPILE_JOBS

if [[ $OSTYPE != darwin* ]]; then
  export OPENSSL_LIBS='-L../openssl -lssl -lcrypto'
fi

./configure -prefix $PWD/../qt_compiled $QT_CFG
make -j8 install
