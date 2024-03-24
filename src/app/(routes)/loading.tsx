import React from 'react' ;

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="inline-flex">
          <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce mx-1"></div>
          <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce mx-1"></div>
          <div className="w-4 h-4 bg-gray-500 rounded-full animate-bounce mx-1"></div>
        </div>
        <p className="mt-2 text-gray-500 text-sm">טוען...</p>
      </div>
    </div>
  );
}

export default Loading ;