import React, { useEffect, useRef } from 'react';
import { X, Trophy, Flag, Gauge, Play, RotateCcw } from 'lucide-react';

interface VishnuDriftGameProps {
  onClose: () => void;
}

export const VishnuDriftGame: React.FC<VishnuDriftGameProps> = ({ onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const CAR_GAME_CODE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>VISHNU DRIFT - ARENA</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        html, body {
            margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;
            background: #050505; font-family: 'Orbitron', sans-serif;
            user-select: none; -webkit-user-select: none; touch-action: none;
        }

        #game-wrapper {
            width: 100vw;
            height: 100vh;
            position: relative;
            display: block;
            overflow: hidden;
            background: #050505;
        }

        canvas { display: block; width: 100%; height: 100%; outline: none; }
        #ui-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; }
        
        .hud-panel {
            position: absolute;
            background: rgba(0, 20, 40, 0.75);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(0, 255, 204, 0.4);
            border-radius: 12px;
            padding: 12px 20px;
            box-shadow: 0 0 20px rgba(0, 255, 204, 0.2);
            color: #fff;
            text-transform: uppercase;
            transform: skew(-10deg);
        }

        #speed-box { bottom: 25px; right: 25px; text-align: right; min-width: 110px; }
        #speed-val { font-size: 56px; color: #00ffcc; line-height: 0.9; font-weight: 900; text-shadow: 0 0 12px rgba(0, 255, 204, 0.6); }
        #speed-label { font-size: 11px; color: #aaa; letter-spacing: 2px; margin-top: 5px; }

        #top-bar {
            position: absolute; top: 20px; left: 50%;
            transform: translateX(-50%) skew(-10deg);
            display: flex; gap: 20px; padding: 10px 20px;
        }
        .stat-box { text-align: center; }
        .stat-label { font-size: 10px; color: #aaa; letter-spacing: 1px; margin-bottom: 2px; }
        .stat-val { font-size: 22px; color: #fff; font-weight: 700; }
        #time-val { color: #ffcc00; }

        .overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(5, 5, 15, 0.94);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 100; pointer-events: auto;
        }
        .hidden { display: none !important; }
        
        h1 { color: #00ffcc; font-size: 42px; margin: 0 0 8px 0; text-shadow: 0 0 30px #00ffcc; letter-spacing: 5px; font-style: italic; text-align: center; line-height: 1.1; }
        p.subtitle { color: #888; margin-bottom: 25px; font-size: 13px; letter-spacing: 2px; text-align: center; }
        
        button.menu-btn {
            background: linear-gradient(135deg, #00ffcc, #008866);
            border: none; padding: 14px 40px; font-size: 18px;
            font-family: 'Orbitron', sans-serif; color: #000; cursor: pointer;
            clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
            font-weight: 900; letter-spacing: 2px; transition: transform 0.15s;
            box-shadow: 0 0 25px rgba(0, 255, 204, 0.5);
        }
        button.menu-btn:hover { transform: scale(1.05); }
        button.menu-btn:active { transform: scale(0.95); }

        #countdown {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            font-size: 110px; font-weight: 900; color: #fff;
            text-shadow: 0 0 50px rgba(255,255,255,0.8); display: none; z-index: 90;
        }

        #mobile-controls {
            display: flex; width: 100%; height: 100%; position: absolute; top: 0; left: 0; pointer-events: none;
        }
        .control-btn {
            position: absolute; background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px); pointer-events: auto; display: flex; 
            align-items: center; justify-content: center; font-size: 24px; 
            color: rgba(255,255,255,0.9); font-weight: bold; border-radius: 16px;
            -webkit-user-select: none; user-select: none;
        }
        
        #btn-left { bottom: 25px; left: 25px; width: 70px; height: 70px; border-radius: 50%; }
        #btn-right { bottom: 25px; left: 105px; width: 70px; height: 70px; border-radius: 50%; }
        #btn-gas { bottom: 25px; right: 25px; width: 80px; height: 100px; background: linear-gradient(to top, rgba(0,255,204,0.3), rgba(255,255,255,0.05)); border-color: rgba(0,255,204,0.6); }
        #btn-brake { bottom: 25px; right: 115px; width: 75px; height: 60px; background: linear-gradient(to top, rgba(255,50,100,0.3), rgba(255,255,255,0.05)); border-color: rgba(255,50,100,0.6); font-size: 16px; }

        @media (max-width: 900px) {
            #speed-box { bottom: auto; top: 20px; right: 20px; }
        }
    </style>
</head>
<body>

<div id="game-wrapper">
    <div id="start-menu" class="overlay">
        <h1>VISHNU DRIFT<br><span style="font-size: 20px; color:white; letter-spacing:3px;">ARENA MODE</span></h1>
        <p class="subtitle">WASD / ARROW KEYS OR TOUCH CONTROLS</p>
        <button class="menu-btn" id="engine-trigger">START ENGINE</button>
    </div>

    <div id="game-over" class="overlay hidden">
        <h1 style="color: #ff3366;">FINISH LINE</h1>
        <p class="subtitle">TOTAL TIME CLOCKED</p>
        <h2 id="final-time" style="color:white; font-size: 38px; margin: 0 0 25px 0;">00:00.00</h2>
        <button class="menu-btn" onclick="window.location.reload()">RACE AGAIN</button>
    </div>

    <div id="countdown">3</div>

    <div id="ui-layer">
        <div id="top-bar" class="hud-panel">
            <div class="stat-box">
                <div class="stat-label">LAP</div>
                <div class="stat-val" id="lap-val">1/3</div>
            </div>
            <div style="width: 1px; background: rgba(255,255,255,0.3); margin: 0 10px;"></div>
            <div class="stat-box">
                <div class="stat-label">TIME</div>
                <div class="stat-val" id="time-val">00:00.00</div>
            </div>
        </div>
        <div id="speed-box" class="hud-panel">
            <div id="speed-val">0</div>
            <div id="speed-label">KM/H</div>
        </div>
        <div id="mobile-controls">
            <div id="btn-left" class="control-btn">◀</div>
            <div id="btn-right" class="control-btn">▶</div>
            <div id="btn-brake" class="control-btn">🛑</div>
            <div id="btn-gas" class="control-btn">▲</div>
        </div>
    </div>
</div>

<script>
const AudioSys = {
    ctx: null, osc: null, gain: null, filter: null, initialized: false,
    init: function() {
        if(this.initialized) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.osc = this.ctx.createOscillator();
            this.osc.type = 'sawtooth';
            this.filter = this.ctx.createBiquadFilter();
            this.filter.type = 'lowpass';
            this.gain = this.ctx.createGain();
            this.gain.gain.value = 0;
            this.osc.connect(this.filter);
            this.filter.connect(this.gain);
            this.gain.connect(this.ctx.destination);
            this.osc.start();
            this.initialized = true;
        } catch(e) {}
    },
    update: function(speed) {
        if(!this.initialized || !this.ctx) return;
        const absSpeed = Math.abs(speed);
        const now = this.ctx.currentTime;
        const pitch = 40 + (absSpeed * 0.7); 
        let targetVol = 0;
        if(absSpeed > 1) {
            targetVol = Math.min(0.3, 0.05 + (absSpeed * 0.0015));
        }
        const filterFreq = 100 + (absSpeed * 4);
        this.osc.frequency.setTargetAtTime(pitch, now, 0.1);
        this.gain.gain.setTargetAtTime(targetVol, now, 0.1);
        this.filter.frequency.setTargetAtTime(filterFreq, now, 0.1);
    }
};

const Game = {
    scene: null, camera: null, renderer: null, car: null,
    inputs: { up: false, down: false, left: false, right: false },
    speed: 0, angle: 0, maxSpeed: 320, acceleration: 90, turnSpeed: 1.8, 
    innerWall: 300, outerWall: 380,
    isInputActive: false, startTime: 0, laps: 1, totalLaps: 3, checkZone: false,
    clock: new THREE.Clock(),

    initSequence: function() {
        AudioSys.init();
        document.getElementById('start-menu').classList.add('hidden');
        this.init3D();
        this.setupControls();
        
        const cdEl = document.getElementById('countdown');
        cdEl.style.display = 'block';
        let count = 3;
        cdEl.innerText = count;
        
        const timer = setInterval(() => {
            count--;
            if(count > 0) {
                cdEl.innerText = count;
            } else if (count === 0) {
                cdEl.innerText = "GO!";
                cdEl.style.color = "#00ffcc";
            } else {
                clearInterval(timer);
                cdEl.style.display = 'none';
                this.startGameplay();
            }
        }, 1000);
        
        this.animate(); 
    },

    startGameplay: function() {
        this.isInputActive = true;
        this.startTime = Date.now();
    },

    init3D: function() {
        const container = document.getElementById('game-wrapper');
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050510);
        this.scene.fog = new THREE.Fog(0x050510, 50, 600); 

        this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 3000);
        this.camera.position.set(0, 5, -10);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        container.appendChild(this.renderer.domElement);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(100, 200, 50);
        this.scene.add(sun);

        this.createEnvironment();
        this.createRoadMarkings();

        this.car = this.createCarMesh(0xff0044); 
        this.car.position.set(340, 0, 0); 
        this.angle = 0; 
        this.scene.add(this.car);
    },

    createEnvironment: function() {
        const groundGeo = new THREE.PlaneGeometry(6000, 6000);
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x111118, roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);

        const geometry = new THREE.RingGeometry(this.innerWall, this.outerWall, 256);
        const material = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4, side: THREE.DoubleSide });
        const road = new THREE.Mesh(geometry, material);
        road.rotation.x = -Math.PI / 2;
        road.position.y = 0.05; 
        this.scene.add(road);

        const wallMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
        const oWall = new THREE.Mesh(new THREE.CylinderGeometry(this.outerWall, this.outerWall, 15, 128, 1, true), wallMat);
        oWall.position.y = 7.5;
        this.scene.add(oWall);
        
        const glowMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
        const oWallBase = new THREE.Mesh(new THREE.CylinderGeometry(this.outerWall, this.outerWall, 0.5, 128, 1, true), glowMat);
        oWallBase.position.y = 0.25;
        this.scene.add(oWallBase);

        const iRing = new THREE.Mesh(new THREE.RingGeometry(this.innerWall - 2, this.innerWall, 128), glowMat);
        iRing.rotation.x = -Math.PI / 2;
        iRing.position.y = 0.1;
        this.scene.add(iRing);

        const finish = new THREE.Mesh(new THREE.PlaneGeometry(80, 5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        finish.rotation.x = -Math.PI / 2;
        finish.position.set(340, 0.06, 0); 
        this.scene.add(finish);

        for(let i=0; i<300; i++) {
            const r = Math.sqrt(Math.random()) * (this.outerWall - 10);
            const theta = Math.random() * 2 * Math.PI;
            const x = r * Math.cos(theta);
            const z = r * Math.sin(theta);
            if (x > 320 && Math.abs(z) < 20) continue;
            this.createNeonObstacle(x, z);
        }
    },

    createRoadMarkings: function() {
        const shape = new THREE.Shape();
        shape.moveTo(0, 8); 
        shape.lineTo(5, -3);
        shape.lineTo(0, 0);
        shape.lineTo(-5, -3);
        shape.lineTo(0, 8);
        const arrowGeo = new THREE.ShapeGeometry(shape);
        const arrowMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
        const count = 64; const radius = 340; 

        for(let i=0; i<count; i++) {
            const theta = (i/count) * Math.PI * 2;
            const arrow = new THREE.Mesh(arrowGeo, arrowMat);
            arrow.position.set(Math.sin(theta) * radius, 0.1, Math.cos(theta) * radius);
            arrow.rotation.x = -Math.PI / 2;
            arrow.rotation.z = -theta + Math.PI; 
            this.scene.add(arrow);
        }
    },

    createCarMesh: function(color) {
        const group = new THREE.Group();
        const bodyGeo = new THREE.BoxGeometry(2.2, 0.8, 4.5);
        const bodyMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.2, metalness: 0.5 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.8;
        group.add(body);
        
        const roof = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 2.2), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1 }));
        roof.position.set(0, 1.4, -0.3);
        group.add(roof);

        const spoiler = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 0.8), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        spoiler.position.set(0, 1.3, 2);
        group.add(spoiler);

        const wGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.6, 24);
        const wMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
        [[1.2, 0.45, 1.2], [-1.2, 0.45, 1.2], [1.2, 0.45, -1.4], [-1.2, 0.45, -1.4]].forEach(p => {
            const w = new THREE.Mesh(wGeo, wMat);
            w.rotation.z = Math.PI/2;
            w.position.set(...p);
            group.add(w);
        });
        return group;
    },

    createNeonObstacle: function(x, z) {
        const h = 5 + Math.random() * 20; 
        const geo = new THREE.BoxGeometry(2, h, 2);
        const mat = new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0x004455, emissiveIntensity: 0.2 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, h/2, z);
        this.scene.add(mesh);
    },

    setupControls: function() {
        document.addEventListener('keydown', (e) => this.handleKey(e.code, true));
        document.addEventListener('keyup', (e) => this.handleKey(e.code, false));

        const bindPointer = (id, action) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            
            const startAction = (e) => {
                e.preventDefault();
                this.inputs[action] = true;
            };
            
            const endAction = (e) => {
                e.preventDefault();
                this.inputs[action] = false;
            };

            btn.addEventListener('pointerdown', startAction);
            btn.addEventListener('pointerup', endAction);
            btn.addEventListener('pointerleave', endAction);
            btn.addEventListener('pointercancel', endAction);
        };

        bindPointer('btn-gas', 'up');
        bindPointer('btn-brake', 'down');
        bindPointer('btn-left', 'left');
        bindPointer('btn-right', 'right');

        window.addEventListener('resize', () => {
            const container = document.getElementById('game-wrapper');
            if (!container || !this.camera || !this.renderer) return;
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(container.clientWidth, container.clientHeight);
        });
    },

    handleKey: function(code, state) {
        if(code === 'ArrowUp' || code === 'KeyW') this.inputs.up = state;
        if(code === 'ArrowDown' || code === 'KeyS') this.inputs.down = state;
        if(code === 'ArrowLeft' || code === 'KeyA') this.inputs.left = state;
        if(code === 'ArrowRight' || code === 'KeyD') this.inputs.right = state;
    },

    animate: function() {
        requestAnimationFrame(() => this.animate());
        const dt = Math.min(this.clock.getDelta(), 0.1);

        if(this.isInputActive) {
            if(this.inputs.up) this.speed += this.acceleration * dt;
            else if(this.inputs.down) this.speed -= this.acceleration * dt;
            else this.speed *= 0.99; 
            
            this.speed = Math.max(Math.min(this.speed, this.maxSpeed), -50);

            if(Math.abs(this.speed) > 1) {
                const dir = this.speed > 0 ? 1 : -1;
                if(this.inputs.left) this.angle += this.turnSpeed * dt * dir;
                if(this.inputs.right) this.angle -= this.turnSpeed * dt * dir;
            }

            let nextX = this.car.position.x + Math.sin(this.angle) * this.speed * dt;
            let nextZ = this.car.position.z + Math.cos(this.angle) * this.speed * dt;
            const distFromCenter = Math.sqrt(nextX*nextX + nextZ*nextZ);
            
            if(distFromCenter > this.outerWall - 2.5) {
                this.speed *= 0.6;
                const a = Math.atan2(nextZ, nextX);
                nextX = Math.cos(a) * (this.outerWall - 2.6);
                nextZ = Math.sin(a) * (this.outerWall - 2.6);
            }

            this.car.position.set(nextX, 0, nextZ);
            this.car.rotation.y = this.angle;

            if(this.car.position.x > 0 && Math.abs(this.car.position.z) < 25 && distFromCenter > this.innerWall) {
                if(!this.checkZone) {
                    this.checkZone = true;
                    if(Date.now() - this.startTime > 8000) { 
                       if(Date.now() - (this.lastLapTime || 0) > 10000) {
                           this.lastLapTime = Date.now();
                           this.laps++;
                           if(this.laps > this.totalLaps) this.endGame();
                           document.getElementById('lap-val').innerText = \`\${Math.min(this.laps, this.totalLaps)}/\${this.totalLaps}\`;
                       }
                    }
                }
            } else { this.checkZone = false; }

            AudioSys.update(this.speed);
            const timeDiff = Date.now() - this.startTime;
            const secs = Math.floor(timeDiff / 1000);
            const ms = Math.floor((timeDiff % 1000) / 10);
            document.getElementById('time-val').innerText = \`\${secs}.\${ms.toString().padStart(2, '0')}\`;
        }

        const targetFOV = 60 + (Math.abs(this.speed) / this.maxSpeed) * 35;
        this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFOV, 0.1);
        this.camera.updateProjectionMatrix();

        const relativeOffset = new THREE.Vector3(0, 6, -14); 
        const cameraOffset = relativeOffset.applyMatrix4(this.car.matrixWorld);
        this.camera.position.lerp(cameraOffset, 0.1);
        this.camera.lookAt(this.car.position.x, this.car.position.y + 1, this.car.position.z);
        
        document.getElementById('speed-val').innerText = Math.floor(Math.abs(this.speed));
        this.renderer.render(this.scene, this.camera);
    },

    endGame: function() {
        this.isInputActive = false;
        AudioSys.update(0); 
        document.getElementById('game-over').classList.remove('hidden');
        document.getElementById('final-time').innerText = document.getElementById('time-val').innerText;
        document.getElementById('mobile-controls').style.setProperty('display', 'none', 'important');
        document.getElementById('ui-layer').style.opacity = '0';
    }
};

document.getElementById('engine-trigger').addEventListener('click', () => {
    Game.initSequence();
});
<\/script>
</body>
</html>
`;

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = CAR_GAME_CODE;
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
      <div className="absolute top-4 left-4 z-[110] flex items-center gap-3">
        <button
          onClick={onClose}
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-full font-bold shadow-xl transition-all flex items-center gap-2 text-sm cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Exit Game</span>
        </button>
      </div>

      <iframe
        ref={iframeRef}
        title="Vishnu Drift Arena 3D"
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
      />
    </div>
  );
};
