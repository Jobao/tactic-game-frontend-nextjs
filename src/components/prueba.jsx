export default function Prueba({x, y}){
    const cells = Array.from({ length: x * y }, (_, index) => index + 1);
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${x}, 60px)` }}>
          {cells.map((cell) => (
            <div key={cell} style={{ border: '1px solid black', height: '60px', textAlign: 'center', lineHeight: '50px' }}>
              {cell}
            </div>
          ))}
        </div>
      );
}