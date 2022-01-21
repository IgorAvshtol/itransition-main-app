import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import { Chip } from '@mui/material';

import { AppRootStateType } from '../../store/store';


type TagsType = {
  setFilter: Dispatch<SetStateAction<string | null>>;
}

export function Tags({ setFilter }: TagsType) {

  // @ts-ignore
  const currentSections = useSelector<AppRootStateType, string[]>(state => state.collection.currentSections);

  let minSlides: number;
  if (currentSections.length < 6) {
    minSlides = currentSections.length / 2;
  } else {
    minSlides = currentSections.length;
  }

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: minSlides,
    slidesToScroll: minSlides,
    arrows: false,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  const onTagClickHandler = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    setFilter(e.currentTarget.textContent);
  };

  return (
      <div style={{ paddingTop: '20px' }}>
        <Slider {...settings} >
          {
            currentSections.map(section => {
              return (
                  <div>
                    <Chip label={section} onClick={(e) => onTagClickHandler(e)}/>
                  </div>
              );
            })
          }
        </Slider>
      </div>
  );
}