import React from "react";

const CandidateOverViewCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 flex-shrink w-80 md:w-[500px]">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <div className="mt-5">
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
          dignissimos saepe obcaecati quibusdam, vitae nesciunt corporis nobis,
          harum ullam libero dicta deleniti. Quod ad exercitationem dolorum
          aspernatur debitis, ullam repellendus consequatur temporibus?
          Praesentium suscipit porro inventore harum, omnis dolorem ipsam!
        </p>
      </div>
      <hr className="mt-5 text-gray-500" />
      <div className="mt-5">
        <h2 className="text-2xl font-semibold">Experience</h2>
        <h2 className="font-medium mt-4">Tech Solution Inc.</h2>
        <div className="flex gap-10 mt-4 text-gray-600 text-sm">
          <p>Network Engineer</p>
          <p>January 2020 - present</p>
        </div>
        <div className="mt-5">
          <ul className="list-decimal list-outside ml-5 space-y-2">
            <li className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus fugit corporis iure porro. Unde culpa architecto
              numquam mollitia asperiores iure dicta, dolor consequatur in fugit
              nemo nulla ipsam at amet.
            </li>
            <li className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus fugit corporis iure porro. Unde culpa architecto
              numquam mollitia asperiores iure dicta, dolor consequatur in fugit
              nemo nulla ipsam at amet.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CandidateOverViewCard;
