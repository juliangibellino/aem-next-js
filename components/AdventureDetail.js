/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import Image from "next/image";
import Link from "next/link";
import Error from "./Error";
import styles from "./AdventureDetail.module.scss";
import iconClose from "../images/icon-close.svg";

function AdventureDetail({ adventureData }) {
    //Must have title, path, and image
    if (
        !adventureData ||
        !adventureData.adventureTitle ||
        !adventureData.adventurePrimaryImage
    ) {
        return (
            <div className="adventure-detail">
                <Link href="/" passHref>
                    <a className="adventure-detail-close-button">
                        <Image src={iconClose} alt="Return" />
                    </a>
                </Link>
                <Error errorMessage="Missing data, adventure could not be rendered." />
            </div>
        );
    }

    return (
        <div className={styles.adventureDetail}>
            <Link href="/" passHref>
                <a className={styles.adventureDetailCloseButton}>
                    <Image src={iconClose} alt="Return" />
                </a>
            </Link>
            <h1 className={styles.adventureDetailTitle}>
                {adventureData.adventureTitle}
            </h1>
            <div className={styles.adventureDetailInfo}>
                <div className={styles.adventureDetailInfoLabel}>Activity</div>
                <div className={styles.adventureDetailInfoDescription}>
                    {adventureData.adventureActivity}
                </div>
                <div className={styles.adventureDetailInfoLabel}>Type</div>
                <div className={styles.adventureDetailInfoDescription}>
                    {adventureData.adventureType}
                </div>
                <div className={styles.adventureDetailInfoLabel}>
                    Trip Length
                </div>
                <div className={styles.adventureDetailInfoDescription}>
                    {adventureData.adventureTripLength}
                </div>
                <div className={styles.adventureDetailInfoLabel}>
                    Group Size
                </div>
                <div className={styles.adventureDetailInfoDescription}>
                    {adventureData.adventureGroupSize}
                </div>
                <div className={styles.adventureDetailInfoLabel}>
                    Difficulty
                </div>
                <div className={styles.adventureDetailInfoDescription}>
                    {adventureData.adventureDifficulty}
                </div>
                <div className={styles.adventureDetailInfoLabel}>Price</div>
                <div className={styles.adventureDetailInfoDescription}>
                    {adventureData.adventurePrice}
                </div>
            </div>
            <div className={styles.adventureDetailContent}>
                <Image
                    className={styles.adventureDetailPrimaryimage}
                    src={adventureData.adventurePrimaryImage.src}
                    alt={adventureData.adventureTitle}
                    height={adventureData.adventurePrimaryImage.height}
                    width={adventureData.adventurePrimaryImage.width}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: adventureData.adventureDescription.html,
                    }}
                ></div>
                <h2>Itinerary</h2>
                <hr />
                <div
                    className={styles.adventureDetailItinerary}
                    dangerouslySetInnerHTML={{
                        __html: adventureData.adventureItinerary.html,
                    }}
                ></div>
                <Contributer {...adventureData.adventureContributor} />
            </div>
        </div>
    );
}

function Contributer(props) {
    if (!props) {
        return null;
    }
    let pictureReference = null;
    if (props.pictureReference) {
        pictureReference = (
            <Image
                className="contributor-image"
                src={props.pictureReference._path}
                alt={props.fullName}
                width={props.pictureReference.width}
                height={props.pictureReference.height}
            />
        );
    }

    return (
        <div className="contributor">
            <hr className="contributor-separator" />
            {pictureReference}
            <h3 className="contributor-name">{props.fullName}</h3>
            <h4 className="contributor-occupation">{props.occupation}</h4>
        </div>
    );
}

export default AdventureDetail;
