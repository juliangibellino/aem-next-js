/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import Image from "next/image";
import Link from "next/link";
import styles from "./Adventures.module.scss";

function Adventures({ adventureList }) {
    return (
        <div className={styles.adventures}>
            <ul className={styles.adventureItems}>
                {
                    //Iterate over the returned data items from the query
                    adventureList.items.map((adventure, index) => {
                        return <AdventureItem key={index} {...adventure} />;
                    })
                }
            </ul>
        </div>
    );
}

// Render individual Adventure item
function AdventureItem(props) {
    //Must have title, path, and image
    if (
        !props ||
        !props._path ||
        !props.adventureTitle ||
        !props.adventurePrimaryImage
    ) {
        return null;
    }
    return (
        <li className={styles.adventureItem}>
            <Link href={`/adventures${props.path}`} passHref>
                <a>
                    <div className={styles.adventureItemImageWrapper}>
                        <Image
                            className={styles.adventureItemImage}
                            src={props.adventurePrimaryImage.src}
                            alt={props.adventureTitle}
                            layout="fill"
                        />
                    </div>
                </a>
            </Link>
            <div className={styles.adventureItemLengthPrice}>
                <div className={styles.adventureItemLength}>
                    {props.adventureTripLength}
                </div>
                <div className={styles.adventureItemPrice}>
                    {props.adventurePrice}
                </div>
            </div>
            <div className={styles.adventureItemTitle}>
                {props.adventureTitle}
            </div>
        </li>
    );
}

export default Adventures;
