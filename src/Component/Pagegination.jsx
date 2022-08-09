import React from 'react';
import styles from './List.module.css';



function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
        <button className={styles.buttons} onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button className={styles.buttons}
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button className = {styles.buttons} onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
        </button>
    </>
  );
}


export default Pagination;