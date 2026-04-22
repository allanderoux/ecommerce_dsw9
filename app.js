

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Productos de muestra con imágenes via URL
const productos = [
  {
    id: 1,
    nombre: 'Auriculares Inalámbricos',
    precio: 59.99,
    stock: 12,
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    descripcion: 'Sonido premium con cancelación de ruido'
  },
  {
    id: 2,
    nombre: 'Smartwatch Negro',
    precio: 129.99,
    stock: 7,
    imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    descripcion: 'Monitoreo de salud y notificaciones'
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico',
    precio: 89.99,
    stock: 5,
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    descripcion: 'Switches azules, retroiluminado RGB'
  },
  {
    id: 4,
    nombre: 'Cámara Instantánea',
    precio: 74.99,
    stock: 9,
    imagen: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    descripcion: 'Imprime fotos al instante en color'
  },
  {
    id: 5,
    nombre: 'Mochila Urbana',
    precio: 44.99,
    stock: 20,
    imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    descripcion: 'Compartimento para laptop 15", impermeable'
  },
  {
    id: 6,
    nombre: 'Lámpara de Escritorio LED',
    precio: 34.99,
    stock: 15,
    imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    descripcion: 'Luz cálida/fría regulable, USB integrado'
  }
];

// Ruta principal — tienda
app.get('/', (req, res) => {
  const tarjetas = productos.map(p => `
    <div style="
      background: #1a1a2e;
      border: 1px solid #2a2a4a;
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
    "
    onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 12px 40px rgba(99,102,241,0.3)'"
    onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'"
    >
      <img
        src="${p.imagen}"
        alt="${p.nombre}"
        style="width:100%; height:200px; object-fit:cover; display:block;"
      />
      <div style="padding: 20px;">
        <h3 style="
          margin: 0 0 8px 0;
          color: #e2e8f0;
          font-size: 1.1rem;
          font-family: 'Segoe UI', sans-serif;
        ">${p.nombre}</h3>
        <p style="
          margin: 0 0 16px 0;
          color: #94a3b8;
          font-size: 0.875rem;
          font-family: 'Segoe UI', sans-serif;
          line-height: 1.4;
        ">${p.descripcion}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="
            font-size: 1.4rem;
            font-weight: 700;
            color: #818cf8;
            font-family: 'Segoe UI', sans-serif;
          ">$${p.precio}</span>
          <span style="
            font-size: 0.75rem;
            color: ${p.stock > 10 ? '#34d399' : '#fbbf24'};
            font-family: 'Segoe UI', sans-serif;
          ">● ${p.stock} en stock</span>
        </div>
        <button style="
          margin-top: 14px;
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-family: 'Segoe UI', sans-serif;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 0.5px;
        "
        onmouseover="this.style.opacity='0.85'"
        onmouseout="this.style.opacity='1'"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>TechShop — Tienda Online</title>
    </head>
    <body style="
      margin: 0;
      background: #0f0f1a;
      color: #e2e8f0;
      font-family: 'Segoe UI', sans-serif;
      min-height: 100vh;
    ">

      <!-- NAVBAR -->
      <nav style="
        background: #13132b;
        border-bottom: 1px solid #2a2a4a;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        position: sticky;
        top: 0;
        z-index: 100;
      ">
        <span style="
          font-size: 1.4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #6366f1, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        ">⚡ TechShop</span>
        <div style="display:flex; gap:24px; align-items:center;">
          <a href="/" style="color:#94a3b8; text-decoration:none; font-size:0.9rem;">Inicio</a>
          <a href="/productos" style="color:#94a3b8; text-decoration:none; font-size:0.9rem;">Productos</a>
          <a href="/carrito" style="
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 8px 18px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 600;
          ">🛒 Carrito</a>
        </div>
      </nav>

      <!-- HERO -->
      <header style="
        text-align: center;
        padding: 80px 20px 60px;
        background: radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f1a 70%);
      ">
        <p style="
          color: #818cf8;
          font-size: 0.85rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin: 0 0 16px 0;
        ">Bienvenido a</p>
        <h1 style="
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          margin: 0 0 20px 0;
          background: linear-gradient(135deg, #e2e8f0 30%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
        ">Tu tienda de tecnología</h1>
        <p style="
          color: #64748b;
          font-size: 1.1rem;
          max-width: 480px;
          margin: 0 auto 36px;
          line-height: 1.6;
        ">Productos cuidadosamente seleccionados para tu estilo de vida digital.</p>
        <a href="/productos" style="
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 14px 36px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          display: inline-block;
        ">Ver productos →</a>
      </header>

      <!-- GRID DE PRODUCTOS -->
      <main style="
        max-width: 1200px;
        margin: 0 auto;
        padding: 60px 24px;
      ">
        <h2 style="
          text-align: center;
          font-size: 1.8rem;
          color: #e2e8f0;
          margin: 0 0 48px 0;
        ">Productos destacados</h2>
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
        ">
          ${tarjetas}
        </div>
      </main>

      <!-- FOOTER -->
      <footer style="
        border-top: 1px solid #2a2a4a;
        text-align: center;
        padding: 32px 20px;
        color: #475569;
        font-size: 0.85rem;
      ">
        © 2025 TechShop — Desarrollo de Software · Clase #9
      </footer>

    </body>
    </html>
  `);
});

// Ruta JSON de productos (útil para después)
app.get('/productos', (req, res) => {
  res.json({ total: productos.length, productos });
});

// Ruta carrito (placeholder)
app.get('/carrito', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"/><title>Carrito — TechShop</title></head>
    <body style="background:#0f0f1a; color:#e2e8f0; font-family:'Segoe UI',sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; margin:0;">
      <span style="font-size:4rem;">🛒</span>
      <h2 style="font-size:1.8rem; margin:16px 0 8px;">Carrito vacío</h2>
      <p style="color:#64748b; margin:0 0 32px;">Próximamente conectado a la sesión del servidor.</p>
      <a href="/" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">← Volver a la tienda</a>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ TechShop corriendo en http://localhost:${PORT}`);
});
