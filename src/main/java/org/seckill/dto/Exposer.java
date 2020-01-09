package org.seckill.dto;

/**
 * 暴露秒杀接口DTO
 */
public class Exposer {
    private boolean exposed;//是否开启秒杀

    private String md5;

    private long seckillID;

    private long now;//系统当前时间毫秒

    private long start;

    private long end;

    public Exposer(boolean exposed, String md5, long seckillID) {
        this.exposed = exposed;
        this.md5 = md5;
        this.seckillID = seckillID;
    }

    public Exposer(boolean exposed,long seckillID, long now, long start, long end) {
        this.exposed = exposed;
        this.seckillID = seckillID;
        this.now = now;
        this.start = start;
        this.end = end;
    }

    public Exposer(boolean exposed, long seckillID) {
        this.exposed = exposed;
        this.seckillID = seckillID;
    }

    public boolean isExposed() {
        return exposed;
    }

    public void setExposed(boolean exposed) {
        this.exposed = exposed;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

    public long getSeckillID() {
        return seckillID;
    }

    public void setSeckillID(long seckillID) {
        this.seckillID = seckillID;
    }

    public long getNow() {
        return now;
    }

    public void setNow(long now) {
        this.now = now;
    }

    public long getStart() {
        return start;
    }

    public void setStart(long start) {
        this.start = start;
    }

    public long getEnd() {
        return end;
    }

    public void setEnd(long end) {
        this.end = end;
    }

    @Override
    public String toString() {
        return "Exposer{" +
                "exposed=" + exposed +
                ", md5='" + md5 + '\'' +
                ", seckillID=" + seckillID +
                ", now=" + now +
                ", start=" + start +
                ", end=" + end +
                '}';
    }
}
