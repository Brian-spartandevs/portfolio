import './FloatingShapes.css';

/* ── Individual 3D Shape Components ── */

function Cube({ size, scrollAngle, style }) {
  const half = size / 2;
  return (
    <div className="floating-shape" style={style}>
      <div
        className="shape-cube"
        style={{
          width: size,
          height: size,
          '--half': `${half}px`,
          transform: `rotateX(${scrollAngle * 0.6}deg) rotateY(${scrollAngle}deg)`,
        }}
      >
        <div className="shape-cube__face shape-cube__face--front" />
        <div className="shape-cube__face shape-cube__face--back" />
        <div className="shape-cube__face shape-cube__face--right" />
        <div className="shape-cube__face shape-cube__face--left" />
        <div className="shape-cube__face shape-cube__face--top" />
        <div className="shape-cube__face shape-cube__face--bottom" />
      </div>
    </div>
  );
}

function Sphere({ size, scrollAngle, style }) {
  return (
    <div className="floating-shape" style={style}>
      <div
        className="shape-sphere"
        style={{
          width: size,
          height: size,
          transform: `rotateX(${scrollAngle * 0.3}deg) rotateY(${scrollAngle * 0.7}deg)`,
        }}
      >
        <div className="shape-sphere__ring" />
        <div className="shape-sphere__ring" />
        <div className="shape-sphere__ring" />
      </div>
    </div>
  );
}

function Pyramid({ size, scrollAngle, style }) {
  const half = size / 2;
  return (
    <div className="floating-shape" style={style}>
      <div
        className="shape-pyramid"
        style={{
          width: size,
          height: size,
          '--half': `${half}px`,
          transform: `rotateX(${scrollAngle * 0.4}deg) rotateY(${scrollAngle * 0.9}deg)`,
        }}
      >
        <div className="shape-pyramid__face shape-pyramid__face--1" />
        <div className="shape-pyramid__face shape-pyramid__face--2" />
        <div className="shape-pyramid__face shape-pyramid__face--3" />
        <div className="shape-pyramid__face shape-pyramid__face--4" />
        <div className="shape-pyramid__base" />
      </div>
    </div>
  );
}

function Cross({ size, scrollAngle, style }) {
  return (
    <div className="floating-shape" style={style}>
      <div
        className="shape-cross"
        style={{
          width: size,
          height: size,
          transform: `rotateX(${scrollAngle * 0.5}deg) rotateY(${scrollAngle * 0.8}deg) rotateZ(${scrollAngle * 0.3}deg)`,
        }}
      >
        <div className="shape-cross__plane shape-cross__plane--1" />
        <div className="shape-cross__plane shape-cross__plane--2" />
        <div className="shape-cross__plane shape-cross__plane--3" />
      </div>
    </div>
  );
}

function Ring({ size, scrollAngle, style }) {
  return (
    <div className="floating-shape" style={style}>
      <div
        className="shape-ring"
        style={{
          width: size,
          height: size,
          transform: `rotateX(${60 + scrollAngle * 0.4}deg) rotateY(${scrollAngle * 0.2}deg)`,
        }}
      />
    </div>
  );
}

function CodeBracket({ size, scrollAngle, style }) {
  return (
    <div className="floating-shape" style={style}>
      <div
        className="shape-code"
        style={{
          fontSize: size * 0.6,
          transform: `rotateX(${scrollAngle * 0.2}deg) rotateY(${scrollAngle * 0.5}deg) translateZ(${Math.sin(scrollAngle * 0.02) * 20}px)`,
        }}
      >
        &lt;/&gt;
      </div>
    </div>
  );
}

/* ── Shape Registry ── */
const shapeComponents = {
  cube: Cube,
  sphere: Sphere,
  pyramid: Pyramid,
  cross: Cross,
  ring: Ring,
  code: CodeBracket,
};

/* ── Main FloatingShapes Component ── */
export default function FloatingShapes({ shapes = [], scrollProgress = 0 }) {
  return (
    <div className="floating-shapes-container">
      {shapes.map((shape, i) => {
        const ShapeComponent = shapeComponents[shape.type];
        if (!ShapeComponent) return null;
        const scrollAngle = scrollProgress * 360 * (shape.speed || 1);
        return (
          <ShapeComponent
            key={i}
            size={shape.size || 60}
            scrollAngle={scrollAngle}
            style={{
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              opacity: shape.opacity || 0.15,
              zIndex: shape.zIndex || 0,
            }}
          />
        );
      })}
    </div>
  );
}
