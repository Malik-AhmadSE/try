
function productDTO(product){
        this._id = product._id;
        this.productName = product.productName;
        this.price = product.price;
        this.category = product.category;
        this.description = product.description;
        this.discount=product.discount;
        this.image=product.image;
        this.video=product.video;
        this.landingImage=product.landingImage;
        this.brand=product.brand;
        this.tang=product.tang;
        this.blade_material=product.blade_material;
        this.handle_material=product.handle_material;
        this.blade_type=product.blade_type;
        this.blade_length=product.blade_length;
        this.blade_color=product.blade_color;
        this.features=product.features;
        this.origin=product.origin;
        this.dexterity=product.dexterity;
        this.blade_edge=product.blade_edge;
    }


module.exports = productDTO;