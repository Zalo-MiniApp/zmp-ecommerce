import React from 'react';
import { zmp } from 'zmp-framework/react';
import listCategories from '../../constants/list-categories';
import { ImgUrl } from '../../utils';

const Categories = () => (
  <div className="grid grid-cols-4 gap-x-2  gap-y-4 p-6">
    {listCategories.map((cate) => (
      <div
        key={cate.id}
        className="flex flex-col items-center"
        onClick={() => zmp.views.main.router.navigate('detail-section', { animate: false })}
        role="button"
      >
        <div>
          <img src={ImgUrl(cate.iconCate)} width="42px" height="42px" alt="" />
        </div>
        <div className="text-xs text-center text-white">{cate.nameCate}</div>
      </div>
    ))}
  </div>
);

export default Categories;
