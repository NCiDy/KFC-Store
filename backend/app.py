from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS  # Thêm dòng này để sử dụng CORS

app = Flask(__name__)
CORS(app)  # Cho phép tất cả các domain gọi API của bạn

# Kết nối với cơ sở dữ liệu MySQL
def get_db_connection():
    connection = mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        port=int(os.getenv("MYSQL_PORT")),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
        ssl_disabled=False
    )
    return connection

@app.route('/get_products/<string:category>', methods=['GET'])
def get_products_by_category(category):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Truy vấn dữ liệu sản phẩm theo ma_danh_muc
        query = """
        SELECT ten_san_pham, gia, mo_ta, hinh_anh
        FROM san_pham
        WHERE ma_danh_muc = %s
        """
        cursor.execute(query, (category,))
        products = cursor.fetchall()
        
        # Kiểm tra nếu có sản phẩm
        if not products:
            return jsonify({"message": "No products found for this category."}), 404

        cursor.close()
        connection.close()

        # Cập nhật tên file hình ảnh thành đường dẫn URL (giả sử bạn có thư mục chứa hình ảnh)
        for product in products:
            product['hinh_anh'] = f"http://localhost:5000/images/{product['hinh_anh']}"

        return jsonify(products)

    except Exception as e:
        # Nếu có lỗi kết nối cơ sở dữ liệu hoặc lỗi khác
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)  # Đảm bảo chạy trên tất cả các IP
