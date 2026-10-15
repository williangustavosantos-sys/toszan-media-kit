import pathlib,subprocess,sys,json
session,base,tag=sys.argv[1:]
code=pathlib.Path('scripts/qa-premium.cjs').read_text().replace('__BASE__',base).replace('__TAG__',tag)
cli=str(pathlib.Path.home()/'.codex/skills/playwright/scripts/playwright_cli.sh')
r=subprocess.run([cli,'-s='+session,'run-code',code],text=True,capture_output=True)
path=pathlib.Path('output/playwright/'+tag+'-qa.log');path.write_text(r.stdout+r.stderr)
if '### Result\n' in r.stdout:
 data=json.loads(r.stdout.split('### Result\n',1)[1].split('\n### ',1)[0])
 path.with_suffix('.json').write_text(json.dumps(data,indent=2))
 print(json.dumps({k:(len(v) if k in ['layouts','flows'] else v) for k,v in data.items() if k not in ['fallback']}))
 sys.exit(1 if data.get('error') or data.get('failures') else 0)
print(str(path),r.returncode,r.stdout[:1000],r.stderr[:500])
sys.exit(1)
