package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name="mimages")
public class MessImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mimageId;

    @Lob
    @Column(name="image1", columnDefinition = "LONGBLOB")
    private byte[] image1;

    @Lob
    @Column(name="image2", columnDefinition = "LONGBLOB")
    private byte[] image2;

    @Lob
    @Column(name="image3", columnDefinition = "LONGBLOB")
    private byte[] image3;

    @Lob
    @Column(name="image4", columnDefinition = "LONGBLOB")
    private byte[] image4;

    public int getMimageId() {
        return mimageId;
    }

    public void setMimageId(int mimageId) {
        this.mimageId = mimageId;
    }

    public byte[] getImage1() {
        return image1;
    }

    public void setImage1(byte[] image1) {
        this.image1 = image1;
    }

    public byte[] getImage2() {
        return image2;
    }

    public void setImage2(byte[] image2) {
        this.image2 = image2;
    }

    public byte[] getImage3() {
        return image3;
    }

    public void setImage3(byte[] image3) {
        this.image3 = image3;
    }

    public byte[] getImage4() {
        return image4;
    }

    public void setImage4(byte[] image4) {
        this.image4 = image4;
    }

    public MessImages() {
        super();
    }

    public MessImages(int mimageId, byte[] image1, byte[] image2, byte[] image3, byte[] image4) {
        super();
        this.mimageId = mimageId;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.image4 = image4;
    }
}