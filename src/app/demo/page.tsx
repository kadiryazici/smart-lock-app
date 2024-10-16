import { SmartLockDevice } from "../components/SmartLockDevice/SmartLockDevice";

export default function Home() {
  return (
    <div className="p-10">
      <SmartLockDevice validPins={['1234', '4567', '8899']} />
    </div>
  );
}
