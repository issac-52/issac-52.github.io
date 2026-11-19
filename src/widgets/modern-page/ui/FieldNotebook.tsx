import { Component, Suspense, useEffect, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { DoubleSide, Group, MathUtils, SRGBColorSpace, TextureLoader } from 'three';

class SceneBoundary extends Component<{children:ReactNode; fallback:ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed ? this.props.fallback : this.props.children;}
}

function Binding({project, engaged}:{project:string; engaged:boolean}) {
  const hinge=useRef<Group>(null);
  const sheet=useRef<Group>(null);
  const target=useRef(0);
  const turn=useRef(0);
  const invalidate=useThree(s=>s.invalidate);
  const [cover,survey,reading,inside]=useLoader(TextureLoader,['cover','meter-admin','field-work','inside'].map(name=>'/notebook/'+name+'.svg'));
  for(const tex of [cover,survey,reading,inside]) tex.colorSpace=SRGBColorSpace;
  useEffect(()=>{
    const section=document.getElementById('projects');
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    function sync(){
      if (!section) return;
      target.current=engaged ? 1 : MathUtils.clamp((innerHeight*.85-section.getBoundingClientRect().top)/(innerHeight*.48),0,1);
      if(motion.matches && hinge.current) hinge.current.rotation.y=-2.78*target.current;
      invalidate();
    }
    sync(); window.addEventListener('scroll',sync,{passive:true}); window.addEventListener('resize',sync);
    return ()=>{window.removeEventListener('scroll',sync);window.removeEventListener('resize',sync);};
  },[engaged,invalidate]);
  useEffect(()=>{turn.current=matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : .38;invalidate();},[project,invalidate]);
  useFrame(({camera},delta)=>{
    if(!hinge.current || !sheet.current) return;
    const angle=-2.78*target.current;
    hinge.current.rotation.y=MathUtils.damp(hinge.current.rotation.y,angle,10,Math.min(delta,.06));
    const openness=-hinge.current.rotation.y/2.78;
    camera.position.set(.9*(1-openness)-.7*openness,.95*(1-openness)+.18,5.4+openness*.8);
    camera.lookAt(-.85*openness,0,0);
    turn.current*=Math.exp(-9*Math.min(delta,.06));sheet.current.rotation.y=-turn.current*openness;
    if(Math.abs(angle-hinge.current.rotation.y)>.001 || turn.current>.001) invalidate();
  });
  return <group rotation={[-.08,-.20,-.11]}>
    <mesh position={[0,0,-.12]}><boxGeometry args={[1.94,2.55,.08]}/><meshStandardMaterial color="#6d577e"/></mesh>
    <mesh><boxGeometry args={[1.88,2.48,.18]}/><meshStandardMaterial color="#e6e1d8"/></mesh>
    <group ref={sheet} position={[-.94,0,.10]}><mesh position={[.94,0,0]}><planeGeometry args={[1.88,2.48]}/><meshBasicMaterial map={project==='field-work'?reading:survey} side={DoubleSide}/></mesh></group>
    <group ref={hinge} position={[-.97,0,.14]}>
      <mesh position={[.97,0,0]}><boxGeometry args={[1.94,2.56,.035]}/><meshStandardMaterial color="#ad9abd" transparent opacity={.91}/></mesh>
      <mesh position={[1,.08,-.025]} rotation={[0,Math.PI,.065]}>
        <planeGeometry args={[1.45,1.88]}/><meshBasicMaterial map={inside}/>
      </mesh>
      <mesh position={[.97,0,.021]}><planeGeometry args={[1.94,2.56]}/><meshBasicMaterial map={cover} transparent opacity={.94}/></mesh>
    </group>
    {[-.83,-.55,.55,.83].map(y=><mesh key={y} position={[-.93,y,.035]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.125,.026,12,44]}/><meshStandardMaterial color="#e1dbe7" metalness={.65} roughness={.22}/></mesh>)}
  </group>;
}

export default function FieldNotebook(props:{project:string;engaged:boolean}){
  const fallback=<img className="book-poster" src={'/notebook/'+(props.engaged?props.project:'cover')+'.svg'} alt=""/>;
  return <SceneBoundary fallback={fallback}><Canvas frameloop="demand" dpr={[1,1.6]} camera={{fov:36,position:[1,1,5.4]}} fallback={fallback}>
    <ambientLight intensity={1.6}/><directionalLight position={[-2,4,4]} intensity={3}/>
    <Suspense fallback={null}><Binding {...props}/></Suspense>
  </Canvas></SceneBoundary>;
}
