package org.seckill.dao;

import org.apache.ibatis.annotations.Param;
import org.seckill.entity.SuccessKilled;

public interface SuccessKilledDao {
    /**
     * 插入购买明细，可过滤重复
     * @param seckillId
     * @param userphone
     * @return 插入行数
     */
    int insertSuccessKilled(@Param("seckillId") long seckillId,@Param("userPhone") long userphone);

    /**
     * 查询并携带实体
     * @param seckillId
     * @return
     */
    SuccessKilled queryByIdWithSeckill(@Param("seckillId") long seckillId,@Param("userPhone") long userphone);

}
