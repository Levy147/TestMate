const app = {
  course:null,
  unit:null,
  list:[],
  idx:0,
  correct:0,
  views:['home','units','quiz','results'],
  show(v){
    document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
    document.getElementById(v).classList.add('active');
    document.getElementById('btn-back').style.display = v==='home'?'none':'inline-flex';
    if(v==='home') document.getElementById('title').textContent='TestMate | Matemática Intermedia 2 y 3';
    if(v==='units' && this.course) document.getElementById('title').textContent = DATA[this.course].title;
  },
  go(c){
    this.course=c;
    this.show('units');
    const listEl=document.getElementById('units-list');
    listEl.innerHTML='';
    const units = DATA[c].units;
    units.forEach(u=>{
      const b=document.createElement('button');
      b.className='unit-btn';
      b.innerHTML='<div><strong>Unidad '+u.id+': '+u.name+'</strong></div><div style="color:#b9b9ff">10 ejercicios • Respuesta directa</div>';
      b.onclick=()=>this.start(c,u.id);
      listEl.appendChild(b);
    });
  },
  back(){
    if(document.getElementById('quiz').classList.contains('active')){
      this.show('units'); return;
    }
    if(document.getElementById('units').classList.contains('active')){
      this.show('home'); return;
    }
    this.show('home');
  },
  start(c,u){
    this.course=c; this.unit=u;
    this.list = (DATA[c].questions[u]||[]).slice();
    if(this.list.length===0){ alert('Cargando ejercicios... Intenta de nuevo en un segundo.'); return; }
    this.idx=0; this.correct=0;
    this.show('quiz');
    this.render();
  },
  render(){
    const q = this.list[this.idx];
    if(!q){ this.finish(); return; }
    document.getElementById('qcount').textContent = 'Pregunta '+(this.idx+1)+' / '+this.list.length;
    document.getElementById('pbar').style.width = ((this.idx)/this.list.length*100)+'%';
    document.getElementById('qtext').textContent = q.question;
    document.getElementById('ans').value='';
    document.getElementById('ans').disabled=false;
    document.getElementById('feedback').style.display='none';
    document.getElementById('next').style.display='none';
    setTimeout(()=>document.getElementById('ans').focus(),50);
  },
  check(){
    const q = this.list[this.idx];
    const inp = document.getElementById('ans');
    if(inp.disabled) return;
    const val = inp.value.trim().replace(',','.');
    inp.disabled=true;
    const num = parseFloat(val);
    const cnum = parseFloat(q.correct);
    let ok = false;
    if(!isNaN(num)&&!isNaN(cnum)) ok = Math.abs(num-cnum)<=0.001;
    else ok = val === String(q.correct);
    if(ok) this.correct++;
    const fb = document.getElementById('feedback');
    fb.style.display='block';
    fb.className = 'feedback '+(ok?'ok':'bad');
    let html = '<strong>'+ (ok?'Correcto':'Incorrecto') +'</strong><br>Respuesta correcta a 3 decimales: <strong>' + (typeof q.correct==='number'?q.correct.toFixed(3):q.correct) + '</strong><br><br>';
    if(q.explanation){
      if(q.explanation.theory) html += '<em>'+q.explanation.theory+'</em><br><br>';
      if(Array.isArray(q.explanation.steps)) q.explanation.steps.forEach((s,i)=>{html += (i+1)+'. '+s+'<br>';});
      if(q.explanation.final) html += '<br><strong>Respuesta final: '+q.explanation.final+'</strong>';
    }
    fb.innerHTML = html;
    document.getElementById('next').style.display='inline-block';
    document.getElementById('pbar').style.width = ((this.idx+1)/this.list.length*100)+'%';
  },
  next(){
    this.idx++;
    if(this.idx>=this.list.length) this.finish();
    else this.render();
  },
  finish(){
    this.show('results');
    document.getElementById('score').textContent = this.correct+' / '+this.list.length;
    const pct = Math.round(this.correct/this.list.length*100);
    document.getElementById('pct').textContent = pct+'%';
  },
  restart(){
    this.show('units');
  }
};
document.getElementById('ans').addEventListener('keydown',e=>{if(e.key==='Enter') app.check();});
document.getElementById('btn-back').style.display='none';
