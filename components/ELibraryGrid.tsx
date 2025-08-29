import React from 'react';
import type { LibraryResource } from '../types';

interface ELibraryGridProps {
  resources: LibraryResource[];
}

const ResourceCard: React.FC<{ resource: LibraryResource }> = ({ resource }) => {
  const { title, author, coverImage, type, isAvailable } = resource;
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56">
        <img className="w-full h-full object-cover" src={coverImage} alt={`Cover for ${title}`} loading="lazy" />
        <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white bg-black bg-opacity-50 rounded-full">{type}</div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-bold text-slate-800 truncate" title={title}>{title}</h3>
        <p className="text-sm text-slate-500 mb-3">{author}</p>
        <div className="mt-auto flex justify-between items-center">
          {isAvailable ? (
            <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Available</span>
          ) : (
            <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">Borrowed</span>
          )}
          <button 
            disabled={!isAvailable}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${
              isAvailable 
                ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

const ELibraryGrid: React.FC<ELibraryGridProps> = ({ resources }) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl shadow-md">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-5.22-8.242l10.44 4.99m-10.44-4.99l10.44 4.99M3 10.519l9-4.266 9 4.266" />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-slate-900">No Resources Found</h3>
        <p className="mt-1 text-sm text-slate-500">
          Your search did not match any resources. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

export default ELibraryGrid;
