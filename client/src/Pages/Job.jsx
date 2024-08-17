import { PlusIcon } from "@heroicons/react/20/solid";

const Job = () => {
  const jobs = [1, 2, 3, 4, 5, 6, 7, 8];
  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White" },
        { value: "beige", label: "Beige" },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "All New Arrivals" },
        { value: "tees", label: "Tees" },
        { value: "crewnecks", label: "Crewnecks" },
      ],
    },
    {
      id: "sizes",
      name: "Sizes",
      options: [
        { value: "xs", label: "XS" },
        { value: "s", label: "S" },
        { value: "m", label: "M" },
        { value: "m", label: "M" },
        { value: "m", label: "M" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-slate-100 mt-28 md:mt-12 pb-6">
        <div>
          <main className="mx-auto px-12">
            {/* <div className="border-b border-gray-200 pb-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  New Arrivals
                </h1>
                <p className="mt-4 text-base text-gray-500">
                  Checkout out the latest release of Basic Tees, new and
                  improved with four openings!
                </p>
              </div> */}

            <div className="pt-8 md:grid md:grid-cols-4 md:gap-x-8">
              <aside className="bg-white px-12 py-4 rounded-lg shadow-lg">
                <h2 className="text-4xl mb-2 text-center text-indigo-700 font-medium">
                  Filters
                </h2>

                {/***** SHOW FILTERS ******/}
                <div className="">
                  <form className="space-y-6 divide-y divide-gray-200">
                    {filters.map((section, sectionIdx) => (
                      <div
                        key={section.name}
                        className={sectionIdx === 0 ? null : "pt-10"}
                      >
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">
                            {section.name}
                          </legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ))}
                  </form>
                </div>
              </aside>

              {/****** SHOW JOBS *****/}
              <div className="mt-6 md:col-span-3">
                <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                  {jobs.map((job, index) => (
                    <div key={index}>
                      <div className="bg-white shadow-lg min-w-[3rem]">{job}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Job;
