total = 0
default = 1
default2 = 2

n = 3

for i in range(n-2):
    total = default + default2
    default = default2
    default2 = total
    print(total)
num = 2           
for i in range(0,11):
    print(num)
    num = num * 2
# print(total)