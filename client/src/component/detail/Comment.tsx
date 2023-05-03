import Image from "next/image";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";

interface CommentProps {
  comment: string;
  ratting: number;
  avatar: string;
  nameUser: string;
}

const Comment: React.FC<CommentProps> = ({
  avatar,
  comment,
  nameUser,
  ratting,
}) => {
  const stars = [];

  for (let i = 0; i < ratting; i++) {
    stars.push(
      <div>
        {" "}
        <AiFillStar size={20} color="yellow"></AiFillStar>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-end">
        <div className="rounded-full">
          <Image
            alt="Mô tả hình ảnh"
            width={30}
            height={30}
            objectFit="contain"
            src={
              avatar ||
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AfgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QALxAAAgIBAgQCCQUBAAAAAAAAAAECAxEEMRIhQVFhcQUTIiNCYoGRsTI0gqHRFP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6iAAAAAAHjaSy3hAegrz1lEOXHxeSyc/99PzfYC0CCOsol8ePNE0WpLMWmn1QHoAAAAAAAAAAAHM5KEJSe0VkCHVaqNKwvan27GbZbZa/eSb/AAcylKcnKW75s8AYGAABNpb3RJ8sxa2yQgDSq10JzUZQ4c7PJbMI19JY7aIt7rkwJgAAAAAAACHWPGls8sf2TEGu/az+n5AyQAAAAAAADQ9GP3di7SM8vei97foBfAAAAAAAAOLoesplDq1yOyDWylDTtwbTyuaAyerB6+bbe7PAAAAAAAaPoyGK5zfxPC+hnGroJuen5pey8cgLAAAAAAAABFqYcdE4+HIlAGECzq9N6j2k8qT2xsVgAAAAAAa2ihwaeHj7X3M7TUu+binjCznGTXilGKitksAegAAAAAAAAACLUVeuplDruvMxzdMjVx4NTYl3z9+YEIAAAADS9HVcFTm95beRbOa1iuC7RR0AAAAAAAAAAI7bq6lmyWPDqBIY+plx6iyXiT3a6Uk41LhXd7lQDwAAAwANqqXFXGS2aOzJo1U6Vw/qh2fQvV6yme8uF/N/oFgHiaaymmvA9AAAAcW2wpWbHjsurI9Xe6ILhWZPbsZc5SnLim22+4Fm7XTlyqXAu73Krbby3lvqeAAAAAAAAAAAAO67J1vMJOPl1LlOv6XL+SKAA24SjOKlBprwOjFqslVLig2u/ia9FnraYzaxndAf/9k="
            }
            loading="lazy"
          ></Image>
        </div>
        <div className="ml-[1rem]">
          <div className="flex">{stars}</div>
          <h2 className="text-[1.4rem]">{nameUser}</h2>
        </div>
      </div>
      <div className="bg-[#d3c9c9] p-8 mt-[1rem]">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
