import { DesktopMindmap } from './DesktopMindmap';
import { MobileMindmap } from './MobileMindmap';

export function MindmapWidget() {
  return (
    <>
      <DesktopMindmap />
      <MobileMindmap />
    </>
  );
}
