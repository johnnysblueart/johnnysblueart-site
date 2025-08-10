async function loadProducts(){
  const res = await fetch('products.json'); const data = await res.json();
  const products = data.products, gallery = document.getElementById('masonry'), grid = document.getElementById('products');
  products.forEach(p=>{ const img=document.createElement('img'); img.src=p.image; img.alt=p.title; img.loading='lazy'; img.addEventListener('click',()=>openModal(p)); gallery.appendChild(img); });
  products.filter(p=>p.status==='available').forEach(p=>{ const card=document.createElement('div'); card.className='card'; card.innerHTML=`
    <img src="${p.image}" alt="${p.title}">
    <div class="pad">
      <h4>${p.title}</h4>
      <div class="price">$${p.priceUSD.toLocaleString()}</div>
      <div class="meta">${p.size} • ${p.medium}</div>
    </div>
    <button>View details</button>`; card.querySelector('button').addEventListener('click',()=>openModal(p)); grid.appendChild(card); });
}
function openModal(p){
  const modal=document.getElementById('modal'); let body=document.getElementById('modalBody');
  if(!body){ body=document.createElement('div'); body.id='modalBody'; document.querySelector('.modal-content').appendChild(body); }
  body.className='modal-body';
  const imageHTML = p.gallery && p.gallery.length>1 ? p.gallery.map(img=>`<img src="${img}" alt="${p.title}">`).join('') : `<img src="${p.image}" alt="${p.title}">`;
  body.innerHTML=`<div class="modal-grid"><div>${imageHTML}</div><div class="buybox">
    <h4 class="title">${p.title}</h4>
    <div class="price">$${p.priceUSD.toLocaleString()}</div>
    <div class="meta">${p.size} • ${p.medium} • ${p.year}</div>
    <p>${p.description||''}</p>
    <div class="actions">
      <a class="primary" href="${p.paypal||'#'}" target="_blank" rel="noopener">Buy now (PayPal)</a>
      <a href="mailto:${p.inquiryEmail||'blueartjohnny@gmail.com'}?subject=Purchase%20Inquiry%3A%20${encodeURIComponent(p.title)}">Hold / Ask a question</a>
    </div>
    <div class="meta">Shipping: ${p.shipping||'Crated & shipped via fine art freight. US estimate $400–$600; international quoted.'}</div>
  </div></div>`;
  modal.classList.remove('hidden');
}
document.addEventListener('DOMContentLoaded',()=>{
  loadProducts();
  document.getElementById('closeModal').addEventListener('click',()=>document.getElementById('modal').classList.add('hidden'));
  document.getElementById('modal').addEventListener('click',e=>{ if(e.target.id==='modal') e.currentTarget.classList.add('hidden'); });
});