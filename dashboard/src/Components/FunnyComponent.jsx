import React from 'react';

const FunnyComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center m-8">
      <h1 className="text-red-500 text-3xl mb-4">No Data Found</h1>
      <div className="mb-8">
        <img
          className="rounded-lg"
          src="https://placedog.net/300/200" // Using a placeholder dog image
          alt="No Data Dog"
        />
      </div>
      <p className="text-gray-700 text-lg">
        Oops! Our team of adorable dogs is on a break, fetching promises and async data. They will be back soon with your results — pawsitively guaranteed!
      </p>
    </div>
  );
};

export default FunnyComponent;
