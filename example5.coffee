Chimera = require('./lib/main').Chimera

cookies = """
openGraphCustom=shown; expires=Wed, 06-Jun-2012 02:09:21 GMT; domain=digg.com; path=/
traffic_control=000000000000000000000080000000000000000002200000000400000000224012008060081180802%3A433%3A112; expires=Thu, 31-May-2012 02:09:21 GMT; domain=.digg.com; path=/
d=1aeb76748e218a75c4be04fca6f5462770834038cdeeb467adefcad0c193d540; expires=Mon, 30-May-2022 12:17:01 GMT; domain=.digg.com; path=/
__utma=146621099.470996035.1338343775.1338343775.1338343775.1; expires=Fri, 30-May-2014 02:09:34 GMT; domain=.digg.com; path=/
__utmb=146621099.1.10.1338343775; expires=Wed, 30-May-2012 02:39:34 GMT; domain=.digg.com; path=/
__utmc=146621099; domain=.digg.com; path=/
__utmz=146621099.1338343775.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); expires=Wed, 28-Nov-2012 14:09:34 GMT; domain=.digg.com; path=/
__utmv=146621099.|2=Users=f%3DN%2Ct%3DN%2Cu%3D_=1; expires=Fri, 30-May-2014 02:09:34 GMT; domain=.digg.com; path=/
UID=2769473b-207.109.73.65-1338343762; expires=Tue, 20-May-2014 02:09:22 GMT; domain=.scorecardresearch.com; path=/
UIDR=1338343762; expires=Tue, 20-May-2014 02:09:22 GMT; domain=.scorecardresearch.com; path=/
test_cookie=CheckForPermission; expires=Wed, 30-May-2012 02:24:24 GMT; domain=.doubleclick.net; path=/
pid=v3:1338343764410370828848687; expires=Thu, 28-Nov-2013 14:09:24 GMT; domain=.twitter.com; path=/
_drt_=NO_DATA; HttpOnly; expires=Wed, 30-May-2012 14:09:25 GMT; domain=.doubleclick.net; path=/
a=7d7880c26b208fdbf1bda5627e005ac61f827eca2135e03f574da3943988132b; expires=Mon, 30-May-2022 12:17:05 GMT; domain=dads.new.digg.com; path=/
auth_token=20120503193139%3A62ae419b-ecfd-4b0a-a52f-5e4697aac076%25fbf91fa768fb2a988554c44ff17c6c1f5fbf0105fbd23bcf2aa69a45be87f0d2; HttpOnly; expires=Mon, 30-May-2022 12:17:07 GMT; domain=.digg.com; path=/
last_auth_method=digg%7C%7Cjohn01sample; expires=Mon, 30-May-2022 12:17:07 GMT; domain=.digg.com; path=/
login_auth_method=digg; expires=Mon, 30-May-2022 12:17:07 GMT; domain=.digg.com; path=/
imp_id=591dc5c792bac4a781a512be155c0dc2b01e7547482b2aaa45055e0be7d5147c; expires=Thu, 31-May-2012 02:09:27 GMT; domain=.digg.com; path=/
session_id=94d4d4bca3da9f7dc916e16c49363a9c5fd026178ead6cb35747471c994da8c3; expires=Wed, 30-May-2012 02:24:27 GMT; domain=.digg.com; path=/
"""

done = 0
count = 30
for i in [1..count]
  do ->
    c = new Chimera(cookies: cookies, disableImages: true)
    c.perform
      url: "http://digg.com"
      run: (callback) ->
        callback(null, "success")
      callback: (err, result) ->
        done = done + 1
        if done == count
          process.exit()
