type Category = {
    title: string;
    items: string[];
  };
  
  type CategorySectionProps = {
    categories: Category[];
  };
  
  export default function CategorySection({ categories }: CategorySectionProps) {
    return (
      <section className="container mx-auto px-6 lg:px-10 py-12 md:py-24">
        {categories.map((category) => (
          <div key={category.title} className="mb-12 last:mb-0">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 md:text-2xl">{category.title}</h2>
            <div className="relative">
              <div className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide">
                {category.items.map((item) => (
                  <CategoryItem key={item} item={item} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
  
  function CategoryItem({ item }: { item: string }) {
    return (
      <div className="relative flex-shrink-0 h-40 w-72 cursor-pointer transition duration-200 ease-out hover:scale-105">
        <img src="/placeholder.svg?height=240&width=426" alt={item} className="rounded-lg object-cover w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 hover:opacity-100 rounded-lg">
          <p className="text-center text-white font-semibold">{item}</p>
        </div>
      </div>
    );
  }
  