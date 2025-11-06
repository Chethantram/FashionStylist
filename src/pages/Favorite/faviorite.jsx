import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Header from "components/ui/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Image from "components/AppImage";
import LoaderHanger from "components/Loader";

const FavoritePage = ({ handleRemoveFavorite }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch user's favorites
  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/wishlist`);
      setFavorites(res.data.product);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <LoaderHanger />;
  }
  return (
    <div className="">
      <Header />
      <div className="w-full min-h-screen bg-gray-50 py-8 px-5 sm:px-8 md:px-20 mt-16">
        <h1 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-3">
          <Link to={"/"} className="cursor-pointer">
            <ChevronLeft size={20} />
          </Link>
          Your Favorites ❤️
        </h1>

        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            You haven’t added any favorites yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <div className="bg-card rounded-xl shadow-brand border border-border overflow-hidden group hover:shadow-elevated transition-smooth">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product?.imageUrl}
                    alt={product?.name}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-smooth`}
                  />
                </div>

                {/* Content Section */}
                <div className="p-4">
                  {/* Brand and Name */}
                  <div className="mb-2">
                    <p className="text-sm text-brand-text-secondary font-medium">
                      {product?.brand}
                    </p>
                    <h3 className="text-base font-semibold text-brand-text-primary line-clamp-2">
                      {product?.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-brand-text-primary">
                      ${product?.price}
                    </span>
                  </div>

                  {/* Category / Occasion */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-muted text-xs bg-blue-100 border-brand-gold text-brand-gold font-semibold border rounded-full capitalize">
                        {product?.category}
                      </span>
                      <span className="px-2 py-1 bg-muted text-xs bg-blue-100 border-brand-gold text-brand-gold font-semibold border rounded-full capitalize">
                        {product?.occasion ? product?.occasion : "None"}
                      </span>
                    </div>
                  </div>
                  <a
                    target="_blank"
                    href={product?.link || "https://www.amazon.in/"}
                    className="flex items-center text-sm font-medium hover:text-brand-gold gap-1 text-brand-gold"
                  >
                    Link <ChevronRight className="size-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
