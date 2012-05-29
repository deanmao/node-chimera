#include "cookiejar.h"

CookieJar::CookieJar()
        : QNetworkCookieJar()
{
}

QString CookieJar::getCookies()
{
  QList<QNetworkCookie> cookieList = allCookies();
  QString cookies = "";
  
  for (QList<QNetworkCookie>::const_iterator i = cookieList.begin(); i != cookieList.end(); i++) {
      cookies = cookies + (*i).toRawForm() + "\n";
  }

  return cookies;
}

void CookieJar::setCookies(const QString &str)
{
  setAllCookies(QNetworkCookie::parseCookies(str.toAscii()));
}
