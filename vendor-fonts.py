import urllib.request,re,pathlib
url='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;600;700&family=Manrope:wght@400;500;600&display=swap'
req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
css=urllib.request.urlopen(req).read().decode()
root=pathlib.Path('dist/assets/fonts');root.mkdir(exist_ok=True)
for i,url in enumerate(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)',css))):
 name='font-'+str(i)+'.'+('woff2' if '.woff2' in url else 'ttf')
 (root/name).write_bytes(urllib.request.urlopen(url).read());css=css.replace(url,name)
(root/'fonts.css').write_text(css)
p=pathlib.Path('dist/style.css');s=p.read_text(encoding='utf-8-sig');s=re.sub(r"@import url\('[^']+'\);",'@import url("assets/fonts/fonts.css");',s,count=1);p.write_text(s,encoding='utf-8')
print('Fonts served locally:',len(list(root.iterdir())),'files')
