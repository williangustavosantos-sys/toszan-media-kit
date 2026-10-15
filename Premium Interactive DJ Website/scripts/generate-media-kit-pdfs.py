#!/usr/bin/env python3
"""Build downloadable, print-ready TOSZAN media kits from verified project assets."""
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageEnhance
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4
ROOT=Path(__file__).resolve().parents[1]; PUB=ROOT/'public'; OUT=PUB/'pdf'; OUT.mkdir(exist_ok=True)
W,H=A4
BG=HexColor('#0A0B0B'); GOLD=HexColor('#C3A677'); WHITE=HexColor('#F5F1EA'); MUTED=HexColor('#B8BAB4')
URLS={
 'Spotify':'https://open.spotify.com/artist/27FuT8olmWQ5g51OEwMkWt',
 'Apple Music':'https://music.apple.com/it/artist/toszan/1885295317',
 'Deezer':'https://www.deezer.com/artist/379581851',
 'Amazon Music':'https://music.amazon.com/artists/B0GSM5H6VV/toszan',
 'YouTube':'https://www.youtube.com/channel/UCrCCo8QaWMrpkCO9yzSUrPg',
 'SoundCloud':'https://soundcloud.com/dj-willian-toszan',
 'Instagram':'https://www.instagram.com/toszan.willian/',
 'Booking':'https://toszan-media-kit.vercel.app/#dj-booking',
 'Creator':'https://toszan-media-kit.vercel.app/#creator'
}
def t(c,x,y,txt,size=12,color=WHITE,font='Helvetica',width=None):
 c.setFillColor(color);c.setFont(font,size)
 if width is None:c.drawString(x,y,txt)
 else:c.drawCentredString(x+width/2,y,txt)
def base(c,label,num):
 c.setFillColor(BG);c.rect(0,0,W,H,stroke=0,fill=1)
 c.setStrokeColor(HexColor('#33332F'));c.line(45,H-62,W-45,H-62);c.line(45,54,W-45,54)
 t(c,45,H-45,'TOSZAN',18,WHITE,'Helvetica-Bold')
 t(c,W-173,H-42,label.upper(),9,GOLD,'Helvetica-Bold')
 t(c,45,35,'DJ / PRODUCER / CREATOR  |  MILANO, ITALIA',8,MUTED)
 t(c,W-63,35,f'{num:02d}',9,GOLD,'Helvetica-Bold')
def link(c,x,y,name,url,width=205,height=35):
 c.setStrokeColor(GOLD);c.setLineWidth(.9);c.roundRect(x,y,width,height,5,stroke=1,fill=0)
 t(c,x+12,y+12,name,11,WHITE,'Helvetica-Bold')
 t(c,x+width-23,y+12,'>',13,GOLD,'Helvetica-Bold')
 c.linkURL(url,(x,y,x+width,y+height),relative=0)
def img(c,path,x,y,w,h,mode='crop',dark=.72):
 im=Image.open(path).convert('RGB')
 if mode=='crop':
  rw,rh=im.size;ratio=max(w/rw,h/rh);size=(max(1,int(rw*ratio)),max(1,int(rh*ratio)))
  im=im.resize(size,Image.Resampling.LANCZOS);cx=(im.width-int(w))/2;cy=(im.height-int(h))/2
  im=im.crop((max(0,cx),max(0,cy),max(0,cx)+int(w),max(0,cy)+int(h)))
 else:im.thumbnail((int(w),int(h)))
 if dark<1:im=ImageEnhance.Brightness(im).enhance(dark)
 data=BytesIO();im.save(data,'JPEG',quality=86);data.seek(0)
 c.drawImage(ImageReader(data),x,y,width=w,height=h,mask='auto')
def lines(c,x,y,texts,size=11,gap=20,color=MUTED):
 for text in texts:t(c,x,y,text,size,color);y-=gap
 return y
def cover(c,subtitle,photo):
 c.setFillColor(BG);c.rect(0,0,W,H,fill=1,stroke=0)
 img(c,photo,0,H*.34,W,H*.66,dark=.65)
 c.setFillColor(BG);c.rect(0,0,W,H*.34,fill=1,stroke=0)
 t(c,45,H-80,'BRAZILIAN DJ BASED IN MILAN',11,GOLD,'Helvetica-Bold')
 t(c,42,H*.3,'TOSZAN',76,WHITE,'Helvetica-Bold')
 t(c,45,H*.25,subtitle,19,GOLD,'Helvetica-Bold')
 lines(c,45,H*.2,['TRIBAL HOUSE  /  CIRCUIT  /  PROGRESSIVE HOUSE','MUSIC · LIVE PERFORMANCE · BOOKINGS'],11,20)
 link(c,45,66,'CONTACT / BOOKING','mailto:dj@toszan.com.br',W-90,42)
 c.showPage()
def dj_music(c,num):
 base(c,'Music & Booking',num)
 t(c,45,H-110,'THE SOUND',38,WHITE,'Helvetica-Bold')
 lines(c,45,H-143,['Tribal House · Circuit · Progressive House','Brazilian rhythm. European dancefloors.'],13,22)
 t(c,45,H-215,'LISTEN TO TOSZAN',15,GOLD,'Helvetica-Bold')
 for i,(name,url) in enumerate(URLS.items()):
  if name in ('Booking','Creator','Instagram'):continue
  col=i%2;row=i//2
  link(c,45+col*255,H-273-row*56,name,url,231,40)
 t(c,45,326,'SELECTED RELEASES / SETS',15,GOLD,'Helvetica-Bold')
 lines(c,45,295,['Promo DJ Set TOSZAN - Splash Roma','BRASIL - Sente essa pressao!','Jamaican (Bam Bam) - TOSZAN Remix','TOSZAN Live at Manicomio','OPERA · BATTE FORTE · THUNDR'],12,28,WHITE)
 t(c,45,135,'All streaming links open official TOSZAN profiles.',10,MUTED)
 c.showPage()
def dj_live(c,num):
 base(c,'Live Performance',num)
 t(c,45,H-115,'THE EXPERIENCE',34,WHITE,'Helvetica-Bold')
 img(c,PUB/'reels/posters/09-wide-crowd-room-proof.webp',45,367,W-90,280,dark=.84)
 t(c,45,336,'REAL STAGE & DANCEFLOOR FOOTAGE',15,GOLD,'Helvetica-Bold')
 lines(c,45,309,['Live performance at the DJ booth and on the dancefloor.',
                   'View authentic clips and press material on the website.'],12,23)
 link(c,45,199,'WATCH LIVE VIDEOS','https://toszan-media-kit.vercel.app/#experience',W-90,42)
 link(c,45,144,'OPEN INSTAGRAM',URLS['Instagram'],W-90,42)
 c.showPage()
def dj_technical(c,num):
 base(c,'Technical & Contact',num)
 t(c,45,H-118,'READY FOR BOOKING',34,WHITE,'Helvetica-Bold')
 t(c,45,H-171,'FORMATS',15,GOLD,'Helvetica-Bold')
 lines(c,45,H-196,['Club / Circuit', 'Special events / Festivals', 'Beach / Pool parties'],13,27,WHITE)
 t(c,45,H-309,'PROFESSIONAL INFORMATION',15,GOLD,'Helvetica-Bold')
 lines(c,45,H-336,['USB / Rekordbox DJ set','Promotional mix available','Official photos and technical details on request.'],12,24)
 t(c,45,351,'DIRECT CONTACT',15,GOLD,'Helvetica-Bold')
 link(c,45,290,'EMAIL BOOKING','mailto:dj@toszan.com.br',W-90,40)
 link(c,45,235,'WHATSAPP','https://wa.me/393428369444',W-90,40)
 link(c,45,180,'INSTAGRAM',URLS['Instagram'],W-90,40)
 c.showPage()
def creator_cover(c,num):
 base(c,'Creator & Brands',num)
 t(c,45,H-115,'WILLIAN TOSZAN',32,WHITE,'Helvetica-Bold')
 t(c,45,H-143,'Brazilian creator based in Milan',14,GOLD)
 im=Image.open(ROOT/'src/imports/creator-portrait-novafoto.png').convert('RGBA')
 im.thumbnail((420,480),Image.Resampling.LANCZOS)
 b=BytesIO();im.save(b,'PNG');b.seek(0)
 c.drawImage(ImageReader(b),W-420,220,width=400,height=486,mask='auto',preserveAspectRatio=True)
 t(c,45,230,'STYLE · FITNESS · LIFESTYLE · EVENTS',11,WHITE,'Helvetica-Bold')
 t(c,45,199,'Content for premium brand collaborations.',11,MUTED)
 link(c,45,104,'VIEW CREATOR PORTFOLIO',URLS['Creator'],W-90,42)
 c.showPage()
def creator_metrics(c,num):
 base(c,'Verified Creator Insights',num)
 t(c,45,H-115,'VERIFIED METRICS',32,WHITE,'Helvetica-Bold')
 t(c,45,H-140,'Instagram Insights · 5 Jun - 4 Jul 2026 (historical)',11,GOLD)
 metrics=[('FOLLOWERS','12,033'),('MONTHLY VIEWS','174,189'),('ACCOUNTS REACHED','56,062'),('INTERACTIONS','24,039'),('NEW FOLLOWERS','1,967'),('NET GROWTH','+1,779')]
 for idx,(name,value) in enumerate(metrics):
  col=idx%2;row=idx//2
  x=45+col*255;y=H-260-row*139
  c.setStrokeColor(HexColor('#4F514A'));c.rect(x,y-34,226,112,stroke=1,fill=0)
  t(c,x+14,y+44,name,9,GOLD,'Helvetica-Bold')
  t(c,x+14,y,value,26,WHITE,'Helvetica-Bold')
 t(c,45,160,'Historical professional Instagram figures - not current totals.',10,MUTED)
 link(c,45,92,'VIEW THE ORIGINAL EVIDENCE','https://toszan-media-kit.vercel.app/analytics',W-90,40)
 c.showPage()
def build(name,complete=False):
 dest=OUT/name;c=canvas.Canvas(str(dest),pagesize=A4,pageCompression=1)
 c.setTitle('TOSZAN - Complete Media Kit' if complete else 'TOSZAN - DJ Booking')
 c.setAuthor('TOSZAN')
 cover(c,'MEDIA KIT  /  DJ BOOKING',PUB/'editorial/booking-hero.webp')
 dj_music(c,2);dj_live(c,3);dj_technical(c,4)
 if complete:creator_cover(c,5);creator_metrics(c,6)
 c.save();print(dest.name, dest.stat().st_size)
build('TOSZAN-BOOK-DJ.pdf')
build('TOSZAN-MEDIA-KIT-COMPLETO.pdf',True)
