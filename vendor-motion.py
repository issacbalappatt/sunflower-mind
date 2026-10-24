import urllib.request,json,tarfile,io,pathlib,hashlib,base64
root=pathlib.Path('dist/vendor');root.mkdir(exist_ok=True)
d=json.load(urllib.request.urlopen('https://registry.npmjs.org/motion/14.6.0'))
data=urllib.request.urlopen(d['dist']['tarball']).read()
assert 'sha512-'+base64.b64encode(hashlib.sha512(data).digest()).decode()==d['dist']['integrity']
with tarfile.open(fileobj=io.BytesIO(data),mode='r:gz') as t:
 for src,dst in [('package/dist/motion.js','motion-14.6.0.js'),('package/LICENSE.md','MOTION-LICENSE.md')]:
  f=t.extractfile(src)
  if not f:raise Exception('Missing '+src)
  (root/dst).write_bytes(f.read())
print('Motion 14.6.0 vendored; npm SHA-512 integrity verified.')
