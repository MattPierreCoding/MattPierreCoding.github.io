total = 0
default = 1
default2 = 2

n = 3

for i in range(n-2):
    total = default + default2
    default = default2
    default2 = total
    print(total)
            

# print(total)