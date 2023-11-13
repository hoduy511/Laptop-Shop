from rest_framework import serializers
from orders.models import OrderItem

from products.models import Product, ProductCategory, ProductImage, Review


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

class ReviewWriteSerializer(serializers.ModelSerializer):
    """Serializers for product write reviews"""
    
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Review
        fields = '__all__'

    def validate(self, data):
        user = data['user']
        product = data['product']

        if OrderItem.objects.filter(order__buyer=user, product=product, order__status='C').exists():
            return data
        else:
            raise serializers.ValidationError("You cannot review a product you haven't purchased.")

    def create(self, validated_data):
        product = validated_data.pop('product', None)
        return Review.objects.create(product=product, **validated_data)

    def update(self, instance, validated_data):
        # Ensure 'product' is not included in the validated data to prevent modification
        validated_data.pop('product', None)
        return super().update(instance, validated_data)

class ReviewReadSerializer(serializers.ModelSerializer):
    """Serializers for product read reviews"""
    writer = serializers.CharField(source="user.get_full_name", read_only=True)

    class Meta:
        model = Review
        fields = (
            "id",
            "rating",
            "comment",
            "writer",
            "product",
            "created_at",
            "updated_at",
        )