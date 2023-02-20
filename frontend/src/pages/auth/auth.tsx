import Registration from './components/registration';

const Auth = () => {
  return (
    <div className="relative h-screen w-screen bg-slate-800 flex items-center justify-center">
      <div className="absolute z-20 w-[450px] h-[500px] shadow-xl">
        <div className="relative h-full w-full">
          <div className="absolute z-20 h-full w-full">
            <div className="h-1/4 w-full bg-customColor1"></div>
            <div className="h-1/4 w-full bg-customColor2"></div>
            <div className="h-1/4 w-full bg-customColor3"></div>
            <div className="h-1/4 w-full bg-customColor4"></div>
          </div>
          <div className="absolute z-30 h-full w-full p-4">
            <Registration />
          </div>
        </div>
      </div>
      <div className="absolute z-10 w-full h-[400px]">
        <div className="h-full w-full">
          <div className="h-1/4 w-full bg-customColor1"></div>
          <div className="h-1/4 w-full bg-customColor2"></div>
          <div className="h-1/4 w-full bg-customColor3"></div>
          <div className="h-1/4 w-full bg-customColor4"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
