import Portfolio from './components/portfolio';

export default function Page() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center h-screen">
      <Portfolio>
        <h1 className="text-4xl font-bold text-white">Hello, World!</h1>
        <p className="text-lg text-white">Welcome to my personal homepage.</p>
      </Portfolio>
    </div>
  );
}
