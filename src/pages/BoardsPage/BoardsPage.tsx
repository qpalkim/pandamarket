import { useEffect, useState } from "react";
import type { BaseArticle } from "@/types/article";
import { getArticleList } from "@/api/article";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import BestBoardItem from "@/components/BestBoardItem/BestBoardItem";
import styles from "./BoardsPage.module.scss";

export default function BoardsPage() {
  const [bestBoards, setBestBoards] = useState<BaseArticle[]>([]);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width:1199px)");

  const bestBoardCount = isMobile ? 1 : isTablet ? 2 : 3;

  const fetchBestBoards = async () => {
    const response = await getArticleList({
      page: 1,
      pageSize: 3,
      orderBy: "like",
    });

    setBestBoards(response.list);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBestBoards();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>베스트 게시글</h2>
      <div className={styles.bestBoardList}>
        {bestBoards.slice(0, bestBoardCount).map((board) => (
          <BestBoardItem key={board.id} {...board} />
        ))}
      </div>
    </div>
  );
}
