import { getRandomInteger } from '../utils.js';
import { OfferPriceRange } from '../constants/priceRanges';
import { PointTypeOffers } from '../constants/pointTypeOffers';

function generateTitle (pointType) {
  const randomIndex = getRandomInteger(0, PointTypeOffers[pointType].length - 1);

  return PointTypeOffers[pointType][randomIndex];
}

function generatePrice () {
  return getRandomInteger(OfferPriceRange.min, OfferPriceRange.max);
}

export const generateOffer = (pointType) => {
  return {
    pointType,
    title: generateTitle(pointType),
    price: generatePrice(),
  };
};