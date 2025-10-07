import { useEffect, useState, useMemo } from "react";
import HighlightSection from "./HighlightSection";
import CoinModal from "./CoinModal";
import { BASE_URL } from "../config/api";

export default function Highlights() {
  const [allCoins, setAllCoins] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const fetchHighlights = async () => {
      setLoading(true);
      try {
        //Fetch coins
        const coinsRes = await fetch(
          `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1`
        );
        const coinsData = await coinsRes.json();
        setAllCoins(coinsData);

        //Fetch trending coins
        const trendingRes = await fetch(`${BASE_URL}/search/trending`);
        const trendingData = await trendingRes.json();

        //Normalize trending coins
        const normalizedTrending = trendingData.coins.map(({ item }) => ({
          id: item.id,
          name: item.name,
          symbol: item.symbol,
          market_cap_rank: item.market_cap_rank ?? null,
          image: item.thumb || item.small || item.large,
          current_price: item.data?.price ?? null,
          price_change_percentage_24h: item.data?.price_change_percentage_24h?.usd ?? null,
          market_cap: item.data?.market_cap ?? null,
          total_volume: item.data?.total_volume ?? null,
        }));
        setTrendingCoins(normalizedTrending);
      } catch (error) {
        console.error("Error fetching highlights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  const handleCardClick = (coin) => setSelectedCoin(coin);
  const closeModal = () => setSelectedCoin(null);

  //top Gainers (descending)
  const topGainers = useMemo(() => {
    return allCoins
      .slice()
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 5);
  }, [allCoins]);

  //top Losers (ascending)
  const topLosers = useMemo(() => {
    return allCoins
      .slice()
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 5);
  }, [allCoins]);

  return (
    <div className="my-6 space-y-6">
      {selectedCoin && <CoinModal coin={selectedCoin} onClose={closeModal} />}

      {loading ? (
        <p>Loading highlights…</p>
      ) : (
        <>
          <HighlightSection
            title="Top Gainers (24h)"
            coins={topGainers}
            onCoinClick={handleCardClick}
          />
          <HighlightSection
            title="Top Losers (24h)"
            coins={topLosers}
            onCoinClick={handleCardClick}
          />
          <HighlightSection
            title="Trending Coins"
            coins={trendingCoins}
            onCoinClick={handleCardClick}
          />
        </>
      )}
    </div>
  );
}
