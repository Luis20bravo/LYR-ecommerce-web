export default function AdminInventory() {
  const rows = [
    { date: "2025-08-10", type: "Entrada", qty: 10, note: "Ajuste de stock" },
    { date: "2025-08-12", type: "Salida",  qty: 5,  note: "Venta" },
    { date: "2025-08-13", type: "Entrada", qty: 5,  note: "Producto recibido" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gestión de inventario</h2>
        <button className="btn btn-primary">Registrar movimiento</button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900/70">
            <tr className="[&>th]:text-left [&>th]:px-4 [&>th]:py-3">
              <th>Fecha</th><th>Tipo</th><th>Cantidad</th><th>Observación</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} className="border-t border-neutral-800 [&>td]:px-4 [&>td]:py-3">
                <td>{r.date}</td><td>{r.type}</td><td>{r.qty}</td><td>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
