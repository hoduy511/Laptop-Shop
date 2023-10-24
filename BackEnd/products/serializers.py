from rest_framework import serializers

from products.models import Product, ProductCategory, ProductImage


class ProductCategoryReadSerializer(serializers.ModelSerializer):
    """
    Serializer class for product categories
    """

    class Meta:
        model = ProductCategory
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    """
    Serializer class for reading product images
    """

    class Meta:
        model = ProductImage
        fields = "__all__"


class ProductReadSerializer(serializers.ModelSerializer):
    """
    Serializer class for reading products
    """
    category = serializers.CharField(source="category.name", read_only=True)
    image = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = "__all__"


class ProductWriteSerializer(serializers.ModelSerializer):
    """
    Serializer class for writing products
    """
    category = ProductCategoryReadSerializer()

    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        category = validated_data.pop("category")
        instance, created = ProductCategory.objects.get_or_create(**category)
        product = Product.objects.create(**validated_data, category=instance)

        return product

    def update(self, instance, validated_data):
        if "category" in validated_data:
            nested_serializer = self.fields["category"]
            nested_instance = instance.category
            nested_data = validated_data.pop("category")
            nested_serializer.update(nested_instance, nested_data)

        return super(ProductWriteSerializer, self).update(instance, validated_data)
