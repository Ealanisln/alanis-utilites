import Converter from "./components/ui/Converters/Money";
import UnitsConverter from "./components/ui/Converters/Distance";
// import Front from './components/ui/Hero'
import NavBar from "./components/ui/NavBar";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <>
      <NavBar />
      {/* <Front /> */}
      <Converter />
      <UnitsConverter />
      <Weather />
    </>
  );
}
